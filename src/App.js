import axios from 'axios';
import './App.css';
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Card from './components/Card';

function App() {
  const [page, setPage] = useState(1);
  const [item, setItem] = useState('');
  const [loading, setLoading] = useState(false);
  const [isList, setIsList] = useState(true);
  const lastPage = useRef();

  useEffect(() => {
    axios
      .get(`https://my-json-server.typicode.com/dmlafiki/jsons/data/${page}`)
      .then((res) => {
        setItem((prev) => [...prev, ...res.data.list]);
        console.log(item, '--------------');

        setLoading(true);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setIsList(false);
          alert('마지막 페이지입니다.');
        }
      });
  }, [page]);
  console.log(item, '--------------');
  const observer = new IntersectionObserver(
    (e) => {
      const isFocusEnd = e[0].isIntersecting;

      if (isFocusEnd) {
        setPage((prev) => prev + 1);
      }
    },
    { threshold: 1 }
  );
  useEffect(() => {
    if (loading) {
      observer.observe(lastPage.current);
    }
  }, [loading]);
  return (
    <>
      <Container>
        {item &&
          item.map((p, idx) => {
            return (
              <Card
                key={idx}
                title={p.title}
                contents={p.contents}
                idx={idx}
                image={p.image}
              />
            );
          })}
      </Container>
      {isList ? <div ref={lastPage}></div> : null}
    </>
  );
}

export default App;

const Container = styled.div`
  margin: auto;
  width: 80vw;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
