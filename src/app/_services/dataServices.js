import useSWR from "swr";

const fetcher = async (url) => {
  try {
    const response = await fetch(url);
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
