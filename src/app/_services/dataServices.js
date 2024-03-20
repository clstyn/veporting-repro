import useSWR from "swr";

const fetcher = async (url) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const useReportsData = () => {
  const { data, error } = useSWR("/api/report/all", fetcher, {
    revalidateOnMount: true,
  });

  return {
    reports: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useReportsDataById = (id) => {
  const { data, error } = useSWR(`/api/report/${id}`, fetcher);

  return {
    report: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useFindingsData = () => {
  const { data, error } = useSWR("/api/finding", fetcher);

  return {
    findings: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useFindingDataById = (id) => {
  const { data, error } = useSWR(`/api/finding/${id}`, fetcher);

  return {
    finding: data,
    isLoading: !error && !data,
    isError: error,
  };
};
