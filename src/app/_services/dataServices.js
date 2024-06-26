import useSWR from "swr";

const fetcher = async (url) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    .split("=")[1];
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
    return data.data;
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
    report: data ? data[0] : null,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useFindingsData = (reportId) => {
  const { data, error } = useSWR(`/api/finding?reportId=${reportId}`, fetcher);

  return {
    findings: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useFindingDataById = (id) => {
  const { data, error } = useSWR(`/api/finding/${id}`, fetcher);

  return {
    finding: data ? data : null,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useActivityLogData = () => {
  const { data, error } = useSWR("/api/activity-log", fetcher);

  return {
    activityLog: data,
    isLoading: !error && !data,
    isError: error,
  };
};
