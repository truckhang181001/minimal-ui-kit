import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import {
  Box,
  Card,
  Table,
  Stack,
  Switch,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';

import axios from '../../utils/axios';
import { PATH_DASHBOARD } from '../../routes/paths';
import useLocales from '../../hooks/useLocales';
import useSettings from '../../hooks/useSettings';

import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';

function Map() {

  const { translate } = useLocales();
  const { themeStretch } = useSettings();

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(106.7);
  const [lat] = useState(10.78);
  const [zoom] = useState(11.5);

  const apiKey =
    'v1.public.eyJqdGkiOiJiNzIyNjYyZS03NWMwLTRjZTItYWMyMC0zZWFmNWEzOTZmZmYifUZewbin7zHxMRCjtEpBFDClz_6rkFwRQwlcT0vkB37sY1ifWxVB3T_1mXvWG_jzadP7FovlQc9_YOljRVWD6PEUgkwD5cKf4NCnbjYwox7OlZah10rsfBkodbTSOg-a9Gi3hruITISXllNCOm3SmmdcuQ4YeJqp0Ih10Q5ne00FRt_gWujwvYgiCrSCQOSLDfZC_MD__CpNw3Osal-drOY-eeo-2T_snYrYrxFLAV6u6CaohKU_20-X0evTaPwjgSQTW0NST1HEcXNfUBc7KPwrrzkkj25NPu4Ky52w8p1dFM4Snoyvbr3jThIffjFjMhBpyRVvPImk-5amdel-lr0.MzRjYzZmZGUtZmY3NC00NDZiLWJiMTktNTc4YjUxYTFlOGZi';
  const mapName = 'explore.map.Grab';
  const region = 'ap-southeast-1';

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor?key=${apiKey}`,
      center: [lng, lat],
      zoom,
    });
  }, [lng, lat, zoom]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/api/v1/stores/orders/addresses/all`);
        response.data.forEach((address) => {
          const el = document.createElement('div');
          el.className = 'circle-marker';
          new maplibregl.Marker({ element: el })
            .setLngLat([address.geometry[0], address.geometry[1]])
            .addTo(map.current);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

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
        </div>
      </Container>
    </Page>
  );
}

export default Map;
