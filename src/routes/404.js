import React from 'react';
import { Layout } from 'antd';
import PixeliceHeader from '../components/Pixel-Header/pixeliceHeader';
import PixeliceFooter from '../components/Pixel-Footer/pixelFooter';

function Error404() {
  const style = {
    wrap: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: '20%',
    },
    code: {
      fontSize: 78,
      color: 'gray',
    },
    notfound: {
      fontSize: 40,
      color: 'gray',
    },
    ops: {
      fontSize: 16,
      color: 'gray',
    },
  };
  return (
    <Layout>
      <PixeliceHeader />
      <Layout.Content className="main-content">
        <div style={style.wrap}>
          <div style={style.code} >404</div>
          <div style={style.notfound}>Not Found</div>
          <div style={style.ops}>Opps! This page seems to be lost. :(</div>
        </div>
      </Layout.Content>
      <PixeliceFooter />
    </Layout>
  );
}
export default Error404;
