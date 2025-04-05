/**
 * Dashboard Service for interacting with dashboard-related APIs
 */

/**
 * Fetch data for the internal dashboard
 */
export async function fetchInternalDashboardData() {
  try {
    const response = await fetch("/api/dashboard/internal");

    if (!response.ok) {
      throw new Error("Failed to fetch dashboard data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching internal dashboard data:", error);
    throw error;
  }
}

/**
 * Fetch data for the client dashboard
 */
export async function fetchClientDashboardData() {
  try {
    const response = await fetch("/api/dashboard/client");

    if (!response.ok) {
      throw new Error("Failed to fetch client dashboard data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching client dashboard data:", error);
    throw error;
  }
}

/**
 * Fetch tasks for a specific client
 */
export async function fetchClientTasks(clientId: string) {
  try {
    const response = await fetch(`/api/clients/${clientId}/tasks`);

    if (!response.ok) {
      throw new Error("Failed to fetch client tasks");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching client tasks:", error);
    throw error;
  }
}

/**
 * Add a comment to a task
 */
export async function addTaskComment(data: {
  taskId: string;
  content: string;
}) {
  try {
    const response = await fetch(`/api/tasks/${data.taskId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: data.content }),
    });

    if (!response.ok) {
      throw new Error("Failed to add comment");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
}

/**
 * Fetch comments for a task
 */
export async function fetchTaskComments(taskId: string) {
  try {
    const response = await fetch(`/api/tasks/${taskId}/comments`);

    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
} 