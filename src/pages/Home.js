import { useContext, useEffect, useState } from "react";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";

const Home = () => { 
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]); 
  const [curDate, setCurDate] = useState(new Date());
  const headerText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}일`

  useEffect(() => {
    if (diaryList.length >= 1) { 
      const firstDate = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDate = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0
      ).getTime();

      setData((diaryList.filter((it) => firstDate <= it.date && it.date <= lastDate)))
    }
  }, [diaryList, curDate])
  
  useEffect(() => { 
  }, [data])

  const increaseMonth = () => { 
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  }
  const decreaseMonth = () => { 
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  }

  return (
    <div>
      <MyHeader
        headText={headerText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  )
}

export default Home;