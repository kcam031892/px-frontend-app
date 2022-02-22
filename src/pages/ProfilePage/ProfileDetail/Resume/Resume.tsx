import { MoreOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Menu, Popover, Space } from 'antd';
import { SummaryCard, TableCard } from 'components';
import { MenuInfo } from 'rc-menu/lib/interface';

import React, { useState } from 'react';
import { SectionType } from 'shared/enums/SectionType';
import { ISection } from 'shared/interfaces/ISection';
import { Button } from 'shared/theme/elements';
import { createEmptyColumnArray, createEmptyTableArray } from 'shared/utils/createEmptyTableArray';
import { generateSectionId } from 'shared/utils/generateSectionId';
import { swapArrayElement } from 'shared/utils/swapArrayElement';
import { ButtonContainer, ResumeWrapper } from './Resume.styled';

const Resume = () => {
  const [sections, setSections] = useState<ISection[]>([]);
  const [isPopShown, setIsPopShown] = useState<boolean>(false);
  const [indexMenuShown, setIndexMenuShown] = useState<number>(-1);
  const handleMenuClick = (menu: MenuInfo) => {
    if (menu.key === SectionType.TABLE) {
      const emptyTextArray = createEmptyTableArray();
      setSections([
        ...sections,
        {
          section_type: SectionType.TABLE,
          sequence: sections.length + 1,
          values: emptyTextArray,
          title: '',
          section_id: generateSectionId(),
        },
      ]);
    } else {
      setSections([
        ...sections,
        {
          section_type: SectionType.TEXTAREA,
          sequence: sections.length + 1,
          title: '',
          section_id: generateSectionId(),
          values: [['']],
        },
      ]);
    }
    setIsPopShown(false);
  };

  const handleVisibleChange = (visible: boolean) => {
    setIsPopShown(visible);
  };

  const handleIndexMenuShown = (index: number) => {
    if (indexMenuShown < 0 || indexMenuShown !== index) {
      setIndexMenuShown(index);
    } else {
      setIndexMenuShown(-1);
    }
  };

  const handleReorderTable = (sectionIndex: number, sourceIndex: number, destinationIndex: number) => {
    const getSection = sections.filter((section, index) => index === sectionIndex)[0];

    if (getSection.values) {
      const arrayText = getSection.values;
      const swappedArray = swapArrayElement(arrayText, sourceIndex, destinationIndex);

      const updatedSection: ISection = { ...getSection, values: swappedArray };

      const updatedSections = sections.map((section, index) => {
        return index === sectionIndex ? updatedSection : section;
      });

      setSections(updatedSections);
    }
  };

  const handleColumnChange = (arrayIndex: number, num: number) => {
    const section = sections.filter((_, index) => index === arrayIndex)[0];
    if (section.values) {
      const arrayText = section.values;
      if (arrayText[0].length === num) return;

      const updatedArrayText = arrayText.map((arrText) => {
        if (arrText.length > num) {
          return arrText.slice(0, -(arrText.length - num));
        }
        return [...arrText, ...createEmptyColumnArray()];
      });
      const updatedSection: ISection = { ...section, values: updatedArrayText };
      const updatedSections = sections.map((section, index) => {
        return index === arrayIndex ? updatedSection : section;
      });

      setSections(updatedSections);
    }
  };

  const handleRowChange = (arrayIndex: number, num: number) => {
    const section = sections.filter((_, index) => index === arrayIndex)[0];

    if (section.values) {
      let arrayText = section.values;
      if (arrayText.length === num) return;
      if (arrayText.length > num) {
        arrayText = arrayText.slice(0, -(arrayText.length - num));
      } else {
        const emptyTextArray = createEmptyTableArray();
        arrayText = [...arrayText, ...emptyTextArray];
      }

      const updatedSection: ISection = { ...section, values: arrayText };
      const updatedSections = sections.map((section, index) => {
        return index === arrayIndex ? updatedSection : section;
      });

      setSections(updatedSections);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick} selectedKeys={[]}>
      <Menu.Item key={SectionType.TABLE}>Table</Menu.Item>
      <Menu.Item key={SectionType.TEXTAREA}>Text Area</Menu.Item>
    </Menu>
  );
  return (
    <ResumeWrapper>
      <Space direction="vertical" className="resume__items" size="large">
        {sections.length > 0 &&
          sections.map((section, index) => (
            <>
              {section.section_type === SectionType.TABLE ? (
                <TableCard
                  key={index}
                  isShownMenu={indexMenuShown === index}
                  index={index}
                  handleIndexMenuShown={handleIndexMenuShown}
                  section={section}
                  handleReorderTable={handleReorderTable}
                  handleRowChange={handleRowChange}
                  handleColumnChange={handleColumnChange}
                />
              ) : (
                <SummaryCard
                  key={index}
                  isShownMenu={indexMenuShown === index}
                  index={index}
                  handleIndexMenuShown={handleIndexMenuShown}
                />
              )}
            </>
          ))}
      </Space>

      <ButtonContainer>
        <Popover
          content={menu}
          placement="topRight"
          trigger="click"
          visible={isPopShown}
          onVisibleChange={handleVisibleChange}
        >
          <Button type="ghost">
            <PlusCircleOutlined />
          </Button>
        </Popover>
      </ButtonContainer>
    </ResumeWrapper>
  );
};

export default Resume;
