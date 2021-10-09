import {useEffect, useState} from "react";
import CountUp from "react-countup";

import ServerRequest from "./helpers/ServerRequest";

const HomePage = () => {
    const [volcanosCount, setVolcanosCount] = useState(0);

    useEffect(() => {
        async function refreshOnMount() {
            const response = await ServerRequest.get({
                "dataset": "significant-volcanic-eruption-database@public",
                "facet": [],
                "rows": 10000,
            });
            setVolcanosCount(response.records.length);
        }

        refreshOnMount();
    }, []);

  return (
      <div className="home-page">
          <div className="site-title">
              Volcano
          </div>
          <div className="site-counter">
            <CountUp
                start={0}
                formattingFn={(value) => value.toLocaleString()}
                end={volcanosCount}
                duration={1.5} />
              <span className="counter-text">
                  Total Volcanos in our site
              </span>
          </div>
          <iframe className="main-map"
              src="https://data.opendatasoft.com/explore/embed/dataset/significant-volcanic-eruption-database@public/map/?q=&location=2,3.18934,-1.52688&basemap=jawg.streets&static=false&datasetcard=false&scrollWheelZoom=false"
              width="80%" height="600" frameBorder="0"></iframe>
      </div>
  )
};

export default HomePage;