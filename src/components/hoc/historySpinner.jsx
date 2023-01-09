import { useCallback, useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import _ from "lodash";

import { getHistory } from "../../services/historyService";

import History from "../history";

const HistorySpinner = () => {
  const [moviesData, setMoviesData] = useState(null);

  const fetchHistoryMovies = useCallback(async () => {
    const { data } = await getHistory();
    _.reverse(data);
    setMoviesData(data);
  }, []);

  useEffect(() => {
    document.title = "VIDLY | History";
    fetchHistoryMovies();
  }, [fetchHistoryMovies]);

  const isData = () => {
    if (moviesData || moviesData === []) return true;
    return false;
  };

  return (
    <div>
      {isData() ? (
        <History moviesData={moviesData} />
      ) : (
        <div className="mySpinner">
          <HashLoader color="#6e00ff" />
        </div>
      )}
    </div>
  );
};

export default HistorySpinner;
