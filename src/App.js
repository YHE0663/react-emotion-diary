import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import React, { useReducer, useRef } from 'react';

const reducer = (state, action) => { 
  let newState = [];
  switch (action.type) { 
    case 'INIT': { 
      return action.data;
    }
    case 'CREATE': { 
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE': { 
      newState = state.filter((it) =>
        it.id !== action.targerId
      )
      break;
    }
    case 'EDIT': {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      )
      break;
    };
    default: 
      return state;
  }
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  { 
    id: 1,
    date: 1687755614089,
    content: '오늘의 일기1번',
    emotion: '1'
  },
  { 
    id: 2,
    date: 1687755614090,
    content: '오늘의 일기2번',
    emotion: '2'
  },
  { 
    id: 3,
    date: 1687755614091,
    content: '오늘의 일기3번',
    emotion: '3'
  },
  { 
    id: 4,
    date: 1687755614092,
    content: '오늘의 일기4번',
    emotion: '4'
  },
  { 
    id: 5,
    date: 1687755614093,
    content: '오늘의 일기5번',
    emotion: '5'
  },
  { 
    id: 6,
    date: 2687755614093,
    content: '오늘의 일기6번',
    emotion: '5'
  }
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);

  const dataId = useRef(7);
  // CREATE
  const onCreate = (date, content, emotion) => { 
    dispatch({
      type: 'CREATE',
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  }
  // REMOVE
  const onRemove = (targetId) => { 
    dispatch({
      type: 'REMOVE',
      targetId
    })
  }
  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: 'EDIT',
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      }
    })
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{
        onCreate,
        onRemove,
        onEdit,
      }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New />} />
              <Route path='/edit/:id' element={<Edit />} />
              <Route path='/diary/:id' element={ <Diary />} />
            </Routes>
          </div>
          </BrowserRouter>
        </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;

/**
 * Query
 * 웹 페이지에 데이터를 전달하는 가장 간단한 방법
 * /edit?id=10&mode=dark
 * =>Query String
 */

/**
 * process.env.PUBLIC_URL는
 * 지금 내가 어떤 위치에 있든 바로 쓸 수 있는 명령어
 */