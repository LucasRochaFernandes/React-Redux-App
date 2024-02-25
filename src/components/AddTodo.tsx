import { FormEvent, useState } from 'react'

export function AddTodo() {
  const [newTodo, setNewTodo] = useState<string>('')
  function handleNewTodo(e: FormEvent) {
    e.preventDefault()
  }
  return (
    <form onSubmit={handleNewTodo}>
      <input
        type="text"
        placeholder="Novo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  )
}
