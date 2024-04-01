import React, { useState, Suspense, lazy, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import InfoTable from "../components/InfoTable";
import SurveyChart from "../components/SurveyChart";
import Footer from "../components/Footer";

//preloading할 컴포넌트가 여러개 일때 재사용
const lazyWithPreload = (importFunction) => {
  const Component = React.lazy(importFunction);
  Component.preload = importFunction; //Componen에 preload속성을 포함시켜서 필요할 때 사용. 아래 useEffect 사용중.
  return Component;
};

// const LazyImageModal = lazy(() => import("../components/ImageModal"));
const LazyImageModal = lazyWithPreload(() =>
  import("../components/ImageModal")
); //Component에 ImageModal컴포넌트 저장

const StatisticsPage = () => {
  const [showModal, setShowModal] = useState(false);

  /* 마운트 되고나서 preloading - 기본
  useEffect(() => {
    import("../components/ImageModal");
  }, []);
   */

  useEffect(() => {
    LazyImageModal.preload();
  }, []);

  return (
    <div className="App">
      <Header />
      <InfoTable />
      <ButtonModal
        onClick={() => {
          setShowModal(true);
        }}
        /* 버튼 마우스 올렸을 때 preloading
        onMouseEnter={() => import("../components/ImageModal")} */
      >
        올림픽 사진 보기
      </ButtonModal>
      <SurveyChart />
      <Footer />
      <Suspense fallback={null}>
        {showModal ? (
          <LazyImageModal
            closeModal={() => {
              setShowModal(false);
            }}
          />
        ) : null}
      </Suspense>
    </div>
  );
};

const ButtonModal = styled.button`
  border-radius: 30px;
  border: 1px solid #999;
  padding: 12px 30px;
  background: none;
  font-size: 1.1em;
  color: #555;
  outline: none;
  cursor: pointer;
`;

export default StatisticsPage;
