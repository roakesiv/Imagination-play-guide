window.creaturePromptBuilder = (() => {
  const missingValueText = 'not specified';

  function promptValue(value) {
    return value || missingValueText;
  }

  function getArtifactTemplate(type) {
    const templates = window.creaturePromptTemplates || {};
    const artifacts = templates.artifacts || {};
    return artifacts[type] || null;
  }

  function buildImagePrompt(creatureData) {
    const templates = window.creaturePromptTemplates || {};
    if (typeof templates.buildImagePrompt !== 'function') {
      return 'Image prompt template is unavailable.';
    }

    return templates.buildImagePrompt(creatureData, { promptValue });
  }

  function buildArtifactOutput(type, creatureData) {
    const template = getArtifactTemplate(type);
    if (!template || typeof template.build !== 'function') {
      return null;
    }

    return {
      title: template.title,
      output: template.build(creatureData, { promptValue })
    };
  }

  return {
    promptValue,
    buildImagePrompt,
    buildArtifactOutput
  };
})();
