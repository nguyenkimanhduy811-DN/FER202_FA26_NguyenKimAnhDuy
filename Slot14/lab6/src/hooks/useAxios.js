
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

/**
 * useAxios - gọi API bằng Axios trong useEffect.
 *
 * requestFn(signal): hàm gọi API, nhận AbortSignal.
 * deps: các giá trị mà requestFn phụ thuộc.
 * options.enabled: bật/tắt việc gọi API.
 * options.initialData: dữ liệu mặc định.
 */
export default function useAxios(
  requestFn,
  deps = [],
  { enabled = true, initialData = null } = {}
) {
  const [data, setData] = useState(initialData);
  const [headers, setHeaders] = useState({});
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [doneKey, setDoneKey] = useState(null);

  // Khóa đại diện cho bộ tham số hiện tại.
  const key = JSON.stringify([...deps, reloadKey]);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();

    const run = async () => {
      setError(null);

      try {
        const res = await requestFn(controller.signal);

        setData(res.data);
        setHeaders(res.headers ?? {});
      } catch (err) {
        if (axios.isCancel(err)) return;

        setError(err.userMessage ?? err.message);
      } finally {
        if (!controller.signal.aborted) {
          setDoneKey(key);
        }
      }
    };

    run();

    // Hủy request khi dependency thay đổi hoặc component bị tháo.
    return () => controller.abort();

    // requestFn được tạo mới mỗi lần render;
    // các giá trị nó sử dụng cần được liệt kê trong deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled]);

  // Tính ngay trong render để tránh nháy trạng thái loading.
  const loading = enabled && doneKey !== key;

  // Cho phép gọi lại request thủ công.
  const refetch = useCallback(() => {
    setReloadKey((key) => key + 1);
  }, []);

  return {
    data,
    setData,
    headers,
    loading,
    error,
    refetch,
  };
}
