export const deleteEntity = async (entityType, entityId) => {
  try {
    const response = await fetch(`http://localhost:3001/${entityType}/${entityId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to delete ${entityType}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error deleting ${entityType}:`, error);
    throw error;
  }
};