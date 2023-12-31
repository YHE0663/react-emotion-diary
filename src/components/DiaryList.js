import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: 'lastest', name: '최신순' },
  { value: 'oldest', name: '오래된 순' },
]

const filterOption = [
  { value: 'All', name: '전부 다' },
  { value: 'good', name: '좋은 감정만' },
  { value: 'bad', name: '안좋은 감정만'},
]

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  )
 }

const DiaryList = (({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("lastest");
  const [filter, setFilter] = useState("All");
  
  const getProcessedDiaryList = () => { 
    const filterCallBack = (item) => { 
      if (filter === 'good') {
        return parseInt(item.emotion) >= 3
      } else { 
        return parseInt(item.emotion) < 3;
      }
    }

    const compare = (a, b) => { 
      if (sortType === 'lastest') {
        return parseInt(b.date) - parseInt(a.date);
      } else { 
        return parseInt(a.date) - (b.date);
      }
    }

    // 깊은 복사 => json화 시켜 문자열 바뀌고 json.parse을 해주면 다시 배열로 복호화
    // -> diaryList가 저장된 배열을 건드리지 않기 위해
    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList = filter === 'All' ? copyList : copyList.filter((it) => filterCallBack(it))
    const sortedList = filteredList.sort(compare);
    return sortedList;
  }

  // const getProcessed

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOption}
          />      
        </div>
        <div className="right_col">
          <MyButton
            type={'positive'}
            text={"새 일가장 쓰기"}
            onClick={() => navigate('/new')}
          />
        </div>
      </div>
      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  )
});

DiaryList.defaultProps = {
  diaryList: [],
}

export default DiaryList;