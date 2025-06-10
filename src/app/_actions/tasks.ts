"use server";

import { Task } from "@/generated/client";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function getTasks(): Promise<Task[]> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  if (!userId) {
    throw new Error("User not found");
  }

  // Fetch tasks for the authenticated user
  const tasks = await prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return tasks;
}

export async function createTask(title: string): Promise<Task> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  if (!userId) {
    throw new Error("User not found");
  }

  // Create a new task for the authenticated user
  const task = await prisma.task.create({
    data: {
      title,
      userId,
    },
  });

  return task;
}

export async function deleteTask(taskId: number): Promise<void> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const userId = session?.user.id;

  if (!userId) {
    throw new Error("User not found");
  }

  if (!session || session.user.id !== userId) {
    throw new Error("Unauthorized");
  }

  // Delete the task for the authenticated user
  await prisma.task.delete({
    where: {
      id: taskId,
      userId,
    },
  });
}

export async function updateTask(
  taskId: number,
  title: string,
  completed: boolean
): Promise<Task> {
  const session = await auth.api.getSession({ headers: await headers() });

  const userId = session?.user.id;
  if (!userId) {
    throw new Error("User not found");
  }

  if (!session || session.user.id !== userId) {
    throw new Error("Unauthorized");
  }

  // Update the task for the authenticated user
  const updatedTask = await prisma.task.update({
    where: {
      id: taskId,
      userId,
    },
    data: {
      title,
      completed,
    },
  });

  return updatedTask;
}
