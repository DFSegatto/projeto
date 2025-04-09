import Button from "./Button";

const formatarData = (data) => {
  if (!data) return "Não definida";
  const dataObj = new Date(data + "T00:00:00");
  return dataObj.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function Tarefa({ tasks, deletar, completar, editar }) {
  return (
    <div className="bg-white p-4 rounded-md">
      <ul>
        {tasks.length === 0 ? (
          <li className="text-center text-gray-500 font-bold italic">
            Nenhuma tarefa
          </li>
        ) : (
          tasks.map((task) => (
            <li
              key={task.id}
              className="border-b border-gray-300 pb-4 rounded-md text-black bg-gray-100 p-2 mb-2 font-bold"
            >
              <h2>
                {task.concluido ? (
                  <s>Tarefa: {task.title}</s>
                ) : (
                  "Tarefa: " + task.title
                )}
              </h2>
              <p>
                {task.concluido ? (
                  <s>Descrição: {task.descricao}</s>
                ) : (
                  "Descrição: " + task.descricao
                )}
              </p>
              <p>
                {task.concluido ? (
                  <s>Data de início: {formatarData(task.dataInicio)}</s>
                ) : (
                  "Data de início: " + formatarData(task.dataInicio)
                )}
              </p>
              <p>
                {task.concluido ? (
                  <s>Data de fim: {formatarData(task.dataFim)}</s>
                ) : (
                  "Data de fim: " + formatarData(task.dataFim)
                )}
              </p>
              <div className="flex gap-2">
                <Button
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => deletar(task.id)}
                >
                  Deletar
                </Button>
                <Button
                  className={`${
                    task.concluido
                      ? "bg-gray-500 opacity-50"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                  disabled={task.concluido}
                  onClick={() => completar(task.id)}
                >
                  Concluir
                </Button>
                <Button
                  className={`${
                    task.concluido
                      ? "bg-gray-500 opacity-50"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  disabled={task.concluido}
                  onClick={() => editar(task.id)}
                >
                  Editar
                </Button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
