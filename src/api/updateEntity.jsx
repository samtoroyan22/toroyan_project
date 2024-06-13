export const updateEntity = async (entityType, entityId, entityData) => {
  try {
    const response = await fetch(`http://localhost:3001/${entityType}/${entityId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entityData)
    });

    if (!response.ok) {
      throw new Error(`Failed to update ${entityType}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating ${entityType}:`, error);
    throw error;
  }
};