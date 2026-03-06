export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: string
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
