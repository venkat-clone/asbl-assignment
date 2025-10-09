import { v4 as uuidv4 } from 'uuid';
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




// Function to generate a session ID
export function generateSessionId() {
  return uuidv4();  // Generates a unique UUID for the sessionId
}