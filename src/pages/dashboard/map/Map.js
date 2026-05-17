import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { Box, CircularProgress, Container } from '@mui/material';

import axios from '../../../utils/axios';
import { PATH_DASHBOARD } from '../../../routes/paths';
import useLocales from '../../../hooks/useLocales';
import useSettings from '../../../hooks/useSettings';

import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';

const SOURCE_ID = 'addresses';

function Map() {

  const { translate } = useLocales();
  const { themeStretch } = useSettings();

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [loading, setLoading] = useState(true);
  const [lng] = useState(106.7);
  const [lat] = useState(10.78);
  const [zoom] = useState(11.5);

  const apiKey =
    'v1.public.eyJqdGkiOiJiNzIyNjYyZS03NWMwLTRjZTItYWMyMC0zZWFmNWEzOTZmZmYifUZewbin7zHxMRCjtEpBFDClz_6rkFwRQwlcT0vkB37sY1ifWxVB3T_1mXvWG_jzadP7FovlQc9_YOljRVWD6PEUgkwD5cKf4NCnbjYwox7OlZah10rsfBkodbTSOg-a9Gi3hruITISXllNCOm3SmmdcuQ4YeJqp0Ih10Q5ne00FRt_gWujwvYgiCrSCQOSLDfZC_MD__CpNw3Osal-drOY-eeo-2T_snYrYrxFLAV6u6CaohKU_20-X0evTaPwjgSQTW0NST1HEcXNfUBc7KPwrrzkkj25NPu4Ky52w8p1dFM4Snoyvbr3jThIffjFjMhBpyRVvPImk-5amdel-lr0.MzRjYzZmZGUtZmY3NC00NDZiLWJiMTktNTc4YjUxYTFlOGZi';
  const mapName = 'explore.map.Grab';
  const region = 'ap-southeast-1';

  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor?key=${apiKey}`,
      center: [lng, lat],
      zoom,
    });

    // Fetch data only after the map style is fully loaded — avoids addSource/addLayer race conditions
    map.current.once('load', async () => {
      try {
        const response = await axios.get(`/api/v1/stores/orders/addresses/all`);
        setLoading(false);

        const geojson = {
          type: 'FeatureCollection',
          features: response.data.map((address) => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [address.geometry[0], address.geometry[1]],
            },
          })),
        };

        map.current.addSource(SOURCE_ID, {
          type: 'geojson',
          data: geojson,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        });

        // Cluster bubble
        map.current.addLayer({
          id: 'clusters',
          type: 'circle',
          source: SOURCE_ID,
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': [
              'step', ['get', 'point_count'],
              '#ff5050', 100,
              '#ff2828', 500,
              '#c80000',
            ],
            'circle-radius': [
              'step', ['get', 'point_count'],
              20, 100,
              30, 500,
              40,
            ],
            'circle-stroke-width': 1,
            'circle-stroke-color': '#ff0000',
            'circle-opacity': 0.7,
          },
        });

        // Individual (unclustered) point
        map.current.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          source: SOURCE_ID,
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-radius': 7,
            'circle-color': '#ff000033',
            'circle-stroke-width': 1,
            'circle-stroke-color': '#ff0000',
          },
        });
      } catch (error) {
        console.error('Failed to load address data:', error);
        setLoading(false);
      }
    });
  }, [lng, lat, zoom]);

  return (
    <Page title="Map">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Map 📌"
          links={[
            { name: translate('dashboard'), href: PATH_DASHBOARD.root },
            { name: 'map', href: PATH_DASHBOARD.map.root },
          ]}
        />
        <div className="map-wrap">
          <div ref={mapContainer} className="map" />
          {loading && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(255,255,255,0.55)',
                zIndex: 10,
              }}
            >
              <CircularProgress color="error" />
            </Box>
          )}
        </div>
      </Container>
    </Page>
  );
}

export default Map;
