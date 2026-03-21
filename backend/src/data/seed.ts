export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: string
  priority: 'low' | 'medium' | 'high'
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
  avatarUrl: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
  stock: number
}

// In-memory stores — reset on server restart
// TODO: add priority to each task once the interface is updated
export const tasks: Task[] = [
  { id: '1', title: 'Set up project structure', completed: true, createdAt: '2026-03-01T09:00:00Z', priority:'high' },
  { id: '2', title: 'Write API integration tests', completed: false, createdAt: '2026-03-02T10:30:00Z', priority:'low'},
  { id: '3', title: 'Review pull request #42', completed: false, createdAt: '2026-03-03T11:00:00Z', priority:'high'},
  { id: '4', title: 'Update documentation', completed: false, createdAt: '2026-03-04T14:00:00Z' , priority:'medium'},
  { id: '5', title: 'Fix login redirect bug', completed: true, createdAt: '2026-03-04T15:30:00Z' , priority:'low'},
  { id: '6', title: 'Deploy to staging environment', completed: false, createdAt: '2026-03-05T08:00:00Z', priority:'high'},
  { id: '7', title: 'Schedule Q2 planning meeting', completed: false, createdAt: '2026-03-05T09:15:00Z' , priority:'medium'},
  { id: '8', title: 'Refactor authentication module', completed: false, createdAt: '2026-03-05T10:00:00Z' , priority:'low'},
]

export const users: User[] = [
  { id: '1', name: 'Alice Chen', email: 'alice@example.com', role: 'Engineer', department: 'Engineering', avatarUrl: '' },
  { id: '2', name: 'Bob Martinez', email: 'bob@example.com', role: 'Designer', department: 'Product', avatarUrl: '' },
  { id: '3', name: 'Carol Williams', email: 'carol@example.com', role: 'Manager', department: 'Engineering', avatarUrl: '' },
  { id: '4', name: 'David Kim', email: 'david@example.com', role: 'Engineer', department: 'Data', avatarUrl: '' },
  { id: '5', name: 'Eve Johnson', email: 'eve@example.com', role: 'Analyst', department: 'Data', avatarUrl: '' },
  { id: '6', name: 'Frank Brown', email: 'frank@example.com', role: 'Engineer', department: 'Infrastructure', avatarUrl: '' },
  { id: '7', name: 'Grace Lee', email: 'grace@example.com', role: 'PM', department: 'Product', avatarUrl: '' },
  { id: '8', name: 'Henry Davis', email: 'henry@example.com', role: 'Designer', department: 'Product', avatarUrl: '' },
]

export const products: Product[] = [
  { id: '1', name: 'Mechanical Keyboard', description: 'Tactile switches, RGB backlight', price: 149.99, category: 'Peripherals', imageUrl: '', stock: 12 },
  { id: '2', name: 'Ultrawide Monitor', description: '34-inch curved, 144Hz', price: 699.99, category: 'Displays', imageUrl: '', stock: 4 },
  { id: '3', name: 'Ergonomic Mouse', description: 'Wireless, 90-day battery', price: 79.99, category: 'Peripherals', imageUrl: '', stock: 25 },
  { id: '4', name: 'USB-C Hub', description: '7-in-1, 4K HDMI, 100W PD', price: 49.99, category: 'Accessories', imageUrl: '', stock: 50 },
  { id: '5', name: 'Webcam 4K', description: 'Auto-focus, built-in mic', price: 129.99, category: 'Peripherals', imageUrl: '', stock: 8 },
  { id: '6', name: 'Desk Lamp', description: 'Adjustable color temperature', price: 39.99, category: 'Accessories', imageUrl: '', stock: 30 },
]

let nextTaskId = tasks.length + 1
export function nextId() {
  return String(nextTaskId++)
}
