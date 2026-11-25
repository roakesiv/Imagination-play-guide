(() => {
  const key = 'islayQuest.amorGrove.v1';
  const empty = JSON.stringify({ version: 1, readyIds: [], activeVisitId: null, visits: [] });
  let lastSnapshot = empty;
  let persistent = true;
  let useLocks = !!window.navigator?.locks;

  function read() {
    if (persistent) {
      try {
        const raw = window.localStorage.getItem(key) ?? empty;
        const state = JSON.parse(raw);
        if (state.version !== 1 || !Array.isArray(state.visits) || !Array.isArray(state.readyIds)) {
          throw new Error('Unrecognized grove save');
        }
        lastSnapshot = raw;
        return state;
      } catch {
        // Keep the last readable visit, and preserve any unreadable save on disk.
        persistent = false;
      }
    }
    return JSON.parse(lastSnapshot);
  }

  async function change(edit) {
    function commit() {
      // Re-read inside the lock so another tab's confirmation or visit closure wins.
      const state = read();
      const result = edit(state);
      const snapshot = JSON.stringify(state);
      if (snapshot === lastSnapshot) return result;
      lastSnapshot = snapshot;
      if (persistent) {
        try {
          window.localStorage.setItem(key, snapshot);
        } catch {
          // The family can finish this visit in memory when storage is unavailable.
          persistent = false;
        }
      }
      return result;
    }
    if (useLocks && persistent) {
      try {
        return await window.navigator.locks.request(key, commit);
      } catch (error) {
        if (error.name !== 'SecurityError' && error.name !== 'InvalidStateError') throw error;
        useLocks = false;
      }
    }
    return commit();
  }

  function newId() {
    if (window.crypto.randomUUID) return window.crypto.randomUUID();
    const bytes = window.crypto.getRandomValues(new Uint8Array(16));
    return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  function activeVisit(state, id) {
    if (!id || state.activeVisitId !== id) return null;
    return state.visits.find(visit => visit.id === id && !visit.closed);
  }

  function setReady(activityId, ready) {
    return change(state => {
      const selected = state.readyIds.includes(activityId);
      if (ready && !selected) state.readyIds.push(activityId);
      if (!ready && selected) state.readyIds = state.readyIds.filter(id => id !== activityId);
    });
  }

  function startVisit() {
    return change(state => {
      const current = activeVisit(state, state.activeVisitId);
      if (current) return current.id;
      const id = newId();
      state.visits.push({ id, closed: false, resume: '#grove/' + id + '/welcome', attempts: [] });
      state.activeVisitId = id;
      return id;
    });
  }

  function setResume(visitId, hash) {
    return change(state => {
      const visit = activeVisit(state, visitId);
      if (visit && hash.startsWith('#grove/' + visit.id + '/')) visit.resume = hash;
    });
  }

  function startAttempt(visitId, activityId, landmarkId) {
    return change(state => {
      const visit = activeVisit(state, visitId);
      if (!visit) return null;
      const id = newId();
      visit.attempts.push({ id, activityId, landmarkId, name: '', completed: false });
      visit.resume = '#grove/' + visit.id + '/activity/' + id;
      return id;
    });
  }

  function nameAttempt(visitId, attemptId, name) {
    return change(state => {
      const visit = activeVisit(state, visitId);
      const attempt = visit?.attempts.find(item => item.id === attemptId);
      if (attempt?.activityId === 'custom') attempt.name = name;
    });
  }

  function confirm(visitId, attemptId, name) {
    return change(state => {
      const visit = state.visits.find(item => item.id === visitId);
      const attempt = visit?.attempts.find(item => item.id === attemptId);
      if (!attempt) return false;
      if (attempt.completed) return true;
      if (!activeVisit(state, visitId)) return false;
      if (typeof name === 'string') attempt.name = name;
      attempt.name = attempt.name.trim();
      // An earlier preview may be completed after a later one via browser history.
      attempt.order = 1 + visit.attempts.filter(item => item.completed).length;
      attempt.completed = true;
      visit.resume = '#grove/' + visit.id + '/reward/' + attempt.id;
      return true;
    });
  }

  function finish(visitId) {
    return change(state => {
      const visit = activeVisit(state, visitId);
      if (!visit) return;
      visit.closed = true;
      state.activeVisitId = null;
    });
  }

  function progress(state, onCompletion) {
    let total = 0;
    const counts = Object.create(null);
    const landmarks = new Set();
    for (const visit of state.visits) {
      const completed = visit.attempts.filter(item => item.completed).sort((a, b) => a.order - b.order);
      for (const attempt of completed) {
        const first = !landmarks.has(attempt.landmarkId);
        landmarks.add(attempt.landmarkId);
        const count = (counts[attempt.activityId] || 0) + 1;
        counts[attempt.activityId] = count;
        total += 1;
        onCompletion?.(visit.id, attempt, first, count);
      }
    }
    return { total, counts, landmarks: Array.from(landmarks) };
  }

  function report(state, visitId) {
    const completions = [];
    const changes = [];
    progress(state, (id, attempt, first) => {
      if (id === visitId) {
        completions.push(attempt);
        if (first) changes.push(attempt.landmarkId);
      }
    });
    return { total: completions.length, completions, changes };
  }

  function reward(state, visitId, attemptId) {
    let result = null;
    progress(state, (id, attempt, first, count) => {
      if (id === visitId && attempt.id === attemptId) result = { first, count };
    });
    return result;
  }

  function suggestions(readyIds, defaultIds, allowedIds) {
    const allowed = new Set(allowedIds);
    const candidates = new Set([...readyIds, ...defaultIds]);
    return Array.from(candidates).filter(id => id !== 'custom' && allowed.has(id)).slice(0, 3);
  }

  window.groveState = {
    key, read, storageAvailable: () => persistent, setReady, startVisit, setResume,
    startAttempt, nameAttempt, confirm, finish, progress, report, reward, suggestions
  };
})();
