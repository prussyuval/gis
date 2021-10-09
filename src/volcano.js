import {
  useParams
} from "react-router-dom";
import {useEffect, useState} from "react";
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import ServerRequest from "./helpers/ServerRequest";
import Loader from "./loader.gif"


const Volcano = () => {
  const [details, setDetails] = useState({});
  let { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function refreshOnMount() {
        const response = await ServerRequest.get({
            "dataset": "significant-volcanic-eruption-database@public",
            "facet": [],
            "q": `recordid=${id}`,
            "rows": 1,
        });
        setDetails(response.records[0].fields);
        setLoading(false);
    }

    refreshOnMount();
    }, []);

    if (loading) {
      return (
          <div className="loader">
            <img src={Loader} alt=""/>
          </div>
      );
    }

    return (
       <div className="single-volcano">
         <Card className="single-volcano-card">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
              You are viewing volcano
          </Typography>
          <Typography variant="h5" component="h2" className="volcano-name">
            {details.name}
          </Typography>
          <Typography color="textSecondary">
              {details.status}
          </Typography>
          <Typography variant="body2" component="p">
            This volcano exploded in {details.country}.
            <br />
            Exact location: {details.location}
            <CardActionArea>
              <Typography gutterBottom variant="h5" component="h2">
                Type
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {details.type}
              </Typography>
            </CardActionArea>
            <CardActionArea>
              <Typography gutterBottom variant="h5" component="h2">
                Year
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {details.year}
              </Typography>
            </CardActionArea>
            <CardActionArea>
              <Typography gutterBottom variant="h5" component="h2">
                Month
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {details.month ? details.month : "Unknown"}
              </Typography>
            </CardActionArea>
            <CardActionArea>
              <Typography gutterBottom variant="h5" component="h2">
                Day
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {details.day ? details.day : "Unknown"}
              </Typography>
            </CardActionArea>
            <CardActionArea>
              <Typography gutterBottom variant="h5" component="h2">
                Elevation
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {details.elevation} Meters
              </Typography>
            </CardActionArea>
            <CardActionArea>
              <Typography gutterBottom variant="h5" component="h2">
                Explosivity Index
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {details.vei}
              </Typography>
            </CardActionArea>
            <CardActionArea>
              <Typography gutterBottom variant="h5" component="h2">
                Deaths
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {details.deaths ? details.deaths : 0}
              </Typography>
            </CardActionArea>
            <CardActionArea>
              <Typography gutterBottom variant="h5" component="h2">
                Injuries
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {details.injuries ? details.injuries : 0}
              </Typography>
            </CardActionArea>
          </Typography>
        </CardContent>
      </Card>
         <iframe className="single-volcano-map"
              src={`https://data.opendatasoft.com/explore/embed/dataset/significant-volcanic-eruption-database@public/map/?q=recordid=${id}&location=8,${details.coordinates}&basemap=jawg.streets&static=false&datasetcard=false&scrollWheelZoom=false`}
              width="1200" height="600" frameBorder="0">
         </iframe>
        </div>
    );
}

export default Volcano;