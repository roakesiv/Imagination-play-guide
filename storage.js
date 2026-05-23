(function () {
  const CURRENT_CREATURE_KEY = 'magicCreature.currentCreature.v1';
  const SAVED_CREATURES_KEY = 'magicCreature.savedCreatures.v1';

  function getLocalStorage() {
    try {
      const testKey = 'magicCreature.storageTest';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return window.localStorage;
    } catch (error) {
      return null;
    }
  }

  function saveCurrentCreature(creatureData) {
    const storage = getLocalStorage();
    if (!storage) {
      return false;
    }

    try {
      storage.setItem(CURRENT_CREATURE_KEY, JSON.stringify({
        ...creatureData,
        updatedAt: new Date().toISOString()
      }));
      return true;
    } catch (error) {
      return false;
    }
  }

  function loadCurrentCreature() {
    const storage = getLocalStorage();
    if (!storage) {
      return null;
    }

    try {
      const savedValue = storage.getItem(CURRENT_CREATURE_KEY);
      return savedValue ? JSON.parse(savedValue) : null;
    } catch (error) {
      return null;
    }
  }

  function clearCurrentCreature() {
    const storage = getLocalStorage();
    if (!storage) {
      return false;
    }

    try {
      storage.removeItem(CURRENT_CREATURE_KEY);
      return true;
    } catch (error) {
      return false;
    }
  }

  function loadSavedCreatures() {
    const storage = getLocalStorage();
    if (!storage) {
      return [];
    }

    try {
      const savedValue = storage.getItem(SAVED_CREATURES_KEY);
      const savedCreatures = savedValue ? JSON.parse(savedValue) : [];
      if (!Array.isArray(savedCreatures)) {
        return [];
      }

      return savedCreatures.filter((savedCreature) => savedCreature && typeof savedCreature.id === 'string');
    } catch (error) {
      return [];
    }
  }

  function saveSavedCreatures(savedCreatures) {
    const storage = getLocalStorage();
    if (!storage) {
      return false;
    }

    try {
      storage.setItem(SAVED_CREATURES_KEY, JSON.stringify(savedCreatures));
      return true;
    } catch (error) {
      return false;
    }
  }

  function addSavedCreature(creatureData) {
    const savedCreatures = loadSavedCreatures();
    const timestamp = new Date().toISOString();
    const savedCreature = {
      id: `creature-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: creatureData.name || '',
      data: { ...creatureData },
      createdAt: timestamp,
      updatedAt: timestamp
    };

    const didSave = saveSavedCreatures([savedCreature, ...savedCreatures]);
    return didSave ? savedCreature : null;
  }

  function deleteSavedCreature(id) {
    const savedCreatures = loadSavedCreatures();
    const nextSavedCreatures = savedCreatures.filter((savedCreature) => savedCreature.id !== id);
    return saveSavedCreatures(nextSavedCreatures);
  }

  window.creatureStorage = {
    saveCurrentCreature,
    loadCurrentCreature,
    clearCurrentCreature,
    loadSavedCreatures,
    addSavedCreature,
    deleteSavedCreature
  };
}());
