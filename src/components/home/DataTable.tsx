import { QueryClient, keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../../services/api";
import { useAuth } from "../../providers/authProvider/authProvider";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

export default function DataTable() {
  const [page, setPage] = useState<number>(1);
  const currentUser = useAuth();
  const { isLoading, isPending, error, data, isPlaceholderData } = useQuery({
    queryKey: ["tasks", page],
    queryFn: () => fetchTasks(currentUser.currentUser?.uid ?? "", page),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  useEffect(() => {
    if (!isPlaceholderData) {
      queryClient.prefetchQuery({
        queryKey: ["tasks", page + 1],
        queryFn: () => fetchTasks(currentUser.currentUser?.uid ?? "", page + 1),
      });
    }
  }, [data, isPlaceholderData, page, currentUser.currentUser?.uid]);

  return (
    <main id="main" className="main">
      <section className="section">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">My Tasks</h5>
            <div
              className="d-flex justify-content-between align-items-center text-center p-3 rounded"
              style={{
                backgroundColor: "#f6f9ff",
                border: "1px solid #ebeef4",
              }}
            >
              <p
                className="border-end w-100 m-0"
                style={{
                  color: "#012970",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                title
              </p>
              <p
                className="border-end border-start w-100 m-0"
                style={{
                  color: "#012970",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                description
              </p>
              <p
                className="border-end border-start w-100 m-0"
                style={{
                  color: "#012970",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                status
              </p>
              <p
                className="border-start w-100 m-0"
                style={{
                  color: "#012970",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                due date
              </p>
            </div>
            {isPending && <h1>Still Pending ....</h1>}
            {isLoading && <h1>Still Loading ....</h1>}
            {error && <h1>Error Fetching Data !</h1>}
            {!data && <div>No data available yet.</div>}

            <div>
              {data?.data?.map((task) => (
                <div
                  className="d-flex justify-content-between align-items-center text-center p-3 rounded h-100"
                  style={{ border: "1px solid #ebeef4" }}
                >
                  <p className="border-end w-100 m-0">{task.title}</p>
                  <p className="border-end border-start w-100 m-0">
                    {task.description}
                  </p>
                  <p className="border-end border-start w-100 m-0">
                    {task.status === "completed" ? (
                      <>
                        <span className="badge bg-success p-2">
                          <i className="bi bi-check-circle me-1"></i>{" "}
                          {task.status}{" "}
                        </span>
                      </>
                    ) : (
                      <>
                        {task.status === "pending" ? (
                          <>
                            {" "}
                            <span className="badge bg-warning text-dark p-2">
                              <i className="bi bi-exclamation-triangle me-1"></i>{" "}
                              {task.status}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="badge bg-secondary p-2">
                              <i className="bi bi-collection me-1"></i>{" "}
                              {task.status}
                            </span>
                          </>
                        )}
                      </>
                    )}
                  </p>
                  <p className="border-start w-100 m-0">
                    {task.dueDate.toString().substring(0, 10)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          <li className={`page-item ${data?.prev === null ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setPage((old) => Math.max(old - 1, 0))}
            >
              Previous
            </button>
          </li>
          {data &&
            data.items &&
            process.env.REACT_APP_LIMIT &&
            Array.from(
              {
                length: Math.ceil(
                  data.items / parseInt(process.env.REACT_APP_LIMIT)
                ),
              },
              (_, index) => (
                <li
                  key={index}
                  className={`page-item ${index + 1 === (data.prev ?? 0) + 1 ? "active": ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => {
                      setPage(index + 1);
                    }}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
          <li className={`page-item ${data?.next === null ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => {
                setPage((old) => old + 1);
              }}
              disabled={data?.next === null}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </main>
  );
}
