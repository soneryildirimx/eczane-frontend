import React from "react";
import styled from "styled-components";
import { BREAKPOINTS } from "../../utils/styled";
import styles from "./Footer.module.scss";

const SIconWrapper = styled.div`
  display: none;
  align-items: center;
`;

const SLeftIcon = styled.img`
  height: 0.75rem;
  width: 0.75rem;
  @media ${BREAKPOINTS.MD.min} {
    height: 2rem;
    width: 2rem;
  }
  margin: 0 0.5rem;
`;

const SShowAllIcon = styled.img`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  height: 0.75rem;
  width: 0.75rem;
  @media ${BREAKPOINTS.MD.min} {
    height: 1.5rem;
    width: 1.5rem;
    right: 1rem;
  }
`;

const SButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const SRightIcon = styled(SLeftIcon)`
  transform: rotate(180deg);
`;

const SParagWrapper = styled.div`
  top: 50%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const SParag = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 0.75rem;
  color: white;
  @media ${BREAKPOINTS.MD.min} {
    font-size: 2.25rem;
  }
`;

export function Footer({
  cityData,
  selectedCity,
  handleChangeCity,
  selectedDist,
  setSelectedDist,
  allData,
  hideDistrictSelector,
}) {
  const noCitySelected = !selectedCity;

  const selectedCityData = cityData?.data?.find((a) => a.id === selectedCity);

  const selectedCityDistricts = selectedCityData?.districts;

  const allCities = cityData?.data;

  const cityDistrictWithData = selectedCityDistricts
    ?.filter((dist) => {
      if (!selectedCityDistricts) return true;
      const distData = allData?.find((d) => d.districtId === dist.id);
      return !!distData;
    })
    .map((i) => i.key);

  return (
    <div className={styles.footerContainer}>
      {!hideDistrictSelector && (
        <div className={styles.ilceBox}>
          <SIconWrapper>
            <SButton>
              <SLeftIcon src="/left-icon.svg" />
            </SButton>
          </SIconWrapper>
          <div className={styles.ilceItems}>
            {noCitySelected && (
              <SParagWrapper>
                <SParag>Şehir Seçiniz</SParag>
              </SParagWrapper>
            )}
            {selectedCityDistricts?.map((item) => (
              <button
                className={
                  cityDistrictWithData.indexOf(item.key) === -1
                    ? `${styles.ilceItem} ${styles.ilceDisabled}`
                    : selectedDist === item.id
                    ? `${styles.ilceItem} ${styles.ilceActive}`
                    : styles.ilceItem
                }
                onClick={() => {
                  setSelectedDist(item.id);
                }}
                key={item.id}
                disabled={cityDistrictWithData.indexOf(item.key) === -1}
              >
                {item.key}
              </button>
            ))}
          </div>
          <SIconWrapper>
            <SButton>
              <SRightIcon src="/left-icon.svg" />
            </SButton>
          </SIconWrapper>
        </div>
      )}

      <div className={styles.citiesBox}>
        {allCities?.map((item) => (
          <button
            className={
              selectedCity === item.id
                ? `${styles.cityItem} ${styles.cityItemActive}`
                : styles.cityItem
            }
            key={item.id}
            onClick={() => handleChangeCity(item)}
          >
            {item.key}
          </button>
        ))}
      </div>
      <div
        className={styles.seeAllWrapper}
        onClick={() => handleChangeCity(null)}
      >
        <button className={`${styles.cityItem} ${styles.seeAllButton}`}>
          Tümünü Gör
        </button>
        <SShowAllIcon src="/show-all-icon.svg" />
      </div>
    </div>
  );
}
