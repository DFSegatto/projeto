"use client";
import { useState, useEffect } from "react";
import Button from "./components/Button";
import Tarefa from "./components/Tarefa";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Carregar tarefas do localStorage quando o componente montar
  useEffect(() => {
    const salvarTarefa = localStorage.getItem("tasks");
    if (salvarTarefa) {
      setTasks(JSON.parse(salvarTarefa));
    }
  }, []);

  // Salvar tarefas no localStorage sempre que elas mudarem
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const adicionarEditarTarefa = (e) => {
    e.preventDefault();
    if (
      !title.trim() ||
      !descricao.trim() ||
      !dataInicio.trim() ||
      !dataFim.trim()
    ) {
      setErrorMessage("Todos os campos são obrigatórios");
      return;
    }

    if (editandoId !== null) {
      setTasks(
        tasks.map((task) =>
          task.id === editandoId &&
          (title !== task.title ||
            descricao !== task.descricao ||
            dataInicio !== task.dataInicio ||
            dataFim !== task.dataFim)
            ? {
                ...task,
                title: title,
                descricao: descricao,
                dataInicio: dataInicio,
                dataFim: dataFim,
                dataAlteracao: new Date().toLocaleString(),
              }
            : task
        )
      );
      setEditandoId(null);
    } else {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          title: title,
          descricao: descricao,
          concluido: false,
          dataInicio: dataInicio,
          dataFim: dataFim,
          dataCriacao: new Date().toLocaleString(),
          dataAlteracao: new Date().toLocaleString(),
        },
      ]);
    }

    limparCampos();
    setErrorMessage("");
  };

  const deletarTarefa = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const concluirTarefa = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, concluido: !task.concluido } : task
      )
    );
    limparCampos();
  };

  const editarTarefa = (id) => {
    const tarefaEditar = tasks.find((task) => task.id === id);
    setTitle(tarefaEditar.title);
    setDescricao(tarefaEditar.descricao);
    setDataInicio(tarefaEditar.dataInicio);
    setDataFim(tarefaEditar.dataFim);
    setEditandoId(id);
  };

  const limparCampos = () => {
    setTitle("");
    setDescricao("");
    setDataInicio("");
    setDataFim("");
    setEditandoId(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold">To-Do List</h1>
      <form
        onSubmit={adicionarEditarTarefa}
        className="flex flex-col gap-2 mb-4"
      >
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm text-gray-600 mb-1">
            Titulo da tarefa
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Digite o titulo da tarefa"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="descricao" className="text-sm text-gray-600 mb-1">
            Descrição da tarefa
          </label>
          <input
            id="descricao"
            name="descricao"
            type="text"
            placeholder="Digite a descrição da tarefa"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="dataInicio" className="text-sm text-gray-600 mb-1">
            Data de início
          </label>
          <input
            id="dataInicio"
            name="dataInicio"
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="dataFim" className="text-sm text-gray-600 mb-1">
            Data de fim
          </label>
          <input
            id="dataFim"
            name="dataFim"
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600" type="submit">
          {editandoId !== null ? "Salvar" : "Adicionar"}
        </Button>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </form>
      <Tarefa
        tasks={tasks}
        deletar={deletarTarefa}
        completar={concluirTarefa}
        editar={editarTarefa}
      />
    </div>
  );
}
