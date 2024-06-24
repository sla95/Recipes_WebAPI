import React from 'react';
import { Input } from 'antd';
//import { PageHeader } from '@ant-design/pro-layout';
import RecipeGrid from './recipegrid';

const { Search } = Input;

function Home(props) {
  return (
    <>
      <div className="site-layout-content">
        <div style={{ padding: '2% 20%' }}>
          <Search placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={null}/>
          <h1 style={{color: "darkblue"}}><p align="center">WebAPI Coursework - Recipes</p></h1>
          <h3 style={{color: "black"}}><p align="center">Welcome, you will get to see different recipes here</p></h3>
        </div>  
        <RecipeGrid />
      </div>
    </>  
  );
}

export default Home;

// home page where files and functions are called and executed 