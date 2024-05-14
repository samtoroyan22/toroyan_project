export const createEntity = async (entityType, entityData) => {
  try {
    const response = await fetch(`http://localhost:3001/${entityType}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entityData)
    });

    if (!response.ok) {
      throw new Error(`Failed to create ${entityType}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error creating ${entityType}:`, error);
    throw error;
  }
};
