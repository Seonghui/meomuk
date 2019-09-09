import React, { Component } from 'react'
import RadioButton from './RadioButton'
import Tagbox from './Tagbox'
import Modal from 'react-modal';
import { Close } from '@material-ui/icons';

import './InputList.scss'

Modal.setAppElement('#root')

class Inputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      resultList: [],
      resultIsOpen: false,
      distanceOptions: [
        {
          id: 0,
          value: '0',
          isChecked: false,
          label: '아주 가까움',
          name: 'distance',
        },
        {
          id: 1,
          value: '1',
          isChecked: false,
          label: '가까움',
          name: 'distance',
        },
        {
          id: 2,
          value: '2',
          isChecked: false,
          label: '중간',
          name: 'distance',
        },
        {
          id: 3,
          value: '3',
          isChecked: false,
          label: '멀다',
          name: 'distance',
        },
        {
          id: 4,
          value: '4',
          isChecked: false,
          label: '완전 멀다',
          name: 'distance',
        },
      ],
      priceOptions: [
        {
          id: 0,
          value: '0',
          isChecked: false,
          label: '7000원 이하',
          name: 'price',
        },
        {
          id: 1,
          value: '1',
          isChecked: false,
          label: '7,000원-10,000원',
          name: 'price',
        },
        {
          id: 2,
          value: '2',
          isChecked: false,
          label: '10,000원-15,000원',
          name: 'price',
        },
        {
          id: 3,
          value: '3',
          isChecked: false,
          label: '15,000원 이상',
          name: 'price',
        },
      ],
      categoryOptions: [
        {
          id: 0,
          value: 'korean',
          isChecked: false,
          label: '한식',
          name: 'category',
        },
        {
          id: 1,
          value: 'chinese',
          isChecked: false,
          label: '중식',
          name: 'category',
        },
        {
          id: 2,
          value: 'japanese',
          isChecked: false,
          label: '일식',
          name: 'category',
        },
        {
          id: 3,
          value: 'world',
          isChecked: false,
          label: '세계음식',
          name: 'category',
        },
        {
          id: 4,
          value: 'buffet',
          isChecked: false,
          label: '뷔페',
          name: 'category',
        },
        {
          id: 5,
          value: 'soup',
          isChecked: false,
          label: '국물요리',
          name: 'category',
        },
        {
          id: 6,
          value: 'noodle',
          isChecked: false,
          label: '면요리',
          name: 'category',
        },
        {
          id: 7,
          value: 'bunsik',
          isChecked: false,
          label: '분식',
          name: 'category',
        },
        {
          id: 8,
          value: 'anytizer',
          isChecked: false,
          label: '간편식',
          name: 'category',
        },
      ]
    }
  }

  closeModal = () => {
    this.setState({
      resultIsOpen: false,
    });
  }

  handleRadioChange = e => {
    const { distanceOptions, priceOptions } = this.state;
    const selectedState = e.target.name === 'distance' ? distanceOptions : priceOptions;
    const nextState = selectedState.map(item => {
      if (item.value === e.target.value) {
        return { ...item, isChecked: true }
      } else {
        return { ...item, isChecked: false }
      }
    })

    if (e.target.name === 'distance') {
      this.setState({
        distanceOptions: nextState,
      })
    } else {
      this.setState({
        priceOptions: nextState,
      })
    }
  }

  handleCheckboxChange = e => {
    const { categoryOptions } = this.state;
    const nextState = categoryOptions.map(item => {
      if (item.value === e.target.value) {
        return { ...item, isChecked: !item.isChecked }
      }
      return item
    });

    this.setState({
      categoryOptions: nextState,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { distanceOptions, priceOptions, categoryOptions } = this.state
    const { restaurants } = this.props


    // 선택된 객체
    const distanceOption = distanceOptions.filter(item => {
      return item.isChecked
    })

    const priceOption = priceOptions.filter(item => {
      return item.isChecked
    })

    const filteredCategory = categoryOptions.reduce((pre, cur) => {
      if (cur.isChecked) {
        pre.push(cur.value)
      }
      return pre
    }, [])

    // 전부 선택한 경우
    if (distanceOption.length && priceOption.length && filteredCategory.length) {
      // 선택된 form의 value
      const distance = Number(distanceOption[0].value)
      const price = Number(priceOption[0].value)


      // 식당 리스트에서 선택한 값들만 필터링
      const resultList = restaurants.filter(item => {
        // 카테고리가 하나라도 겹치는 경우 true 리턴
        const categoryFlag = item.category.some(e => filteredCategory.includes(e))
        return item.price === price && item.distance === distance && categoryFlag
      })

      // 랜덤 출력을 위한 인덱스
      const randomIndex = Math.floor(Math.random() * resultList.length)
      const result = resultList.length > 0 ? resultList[randomIndex].name : '결과가 없습니다.'

      this.setState({
        result: result,
        resultList: resultList,
        resultIsOpen: true
      })
    }

    // 전부 선택하지 않은 경우
    if (!filteredCategory.length || !priceOption.length || !distanceOption.length) {
      let result = ''
      if (!filteredCategory.length) {
        result = '종류를 선택해 주세요.'
      }

      if (!priceOption.length) {
        result = '가격을 선택해 주세요.'
      }

      if (!distanceOption.length) {
        result = '거리를 선택해 주세요.'
      }

      this.setState({
        result: result,
        resultList: [],
        resultIsOpen: true
      })
    }
  }

  render() {
    const { distanceOptions, priceOptions, categoryOptions, result, resultList, resultIsOpen } = this.state

    const priceForm = priceOptions.map((price, id) => {
      return (<RadioButton key={id} handleRadioChange={this.handleRadioChange} {...price} />)
    })

    const distanceForm = distanceOptions.map((distance, id) => {
      return (<RadioButton key={id} handleRadioChange={this.handleRadioChange} {...distance} />)
    })

    const categoryForm = categoryOptions.map((category, id) => {
      return (<Tagbox key={id} handleCheckboxChange={this.handleCheckboxChange} {...category} />)
    })

    return (
      <form>
        <div>
          <Modal
            isOpen={resultIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="모먹 결과입니다."
            className="center aligned modal"
            overlayClassName="overlay"
          >
            <button className="modal-close" onClick={this.closeModal}><Close /></button>
            <div className="cetner aligned modal-body">
              <ModalBody result={result} resultList={resultList} />
            </div>
          </Modal>
        </div>
        <div className="distance form">
          <h3>거리를 선택해 주세요.</h3>
          {distanceForm}
        </div>
        <div className="price form">
          <h3>가격을 선택해 주세요.</h3>
          {priceForm}
        </div>
        <div className="category form">
          <h3>종류를 선택하세요.</h3>
          <p className="large caption">*중복 선택 가능</p>
          {categoryForm}
        </div>
        <button onClick={this.handleSubmit} className="fluid button">오늘 모먹?</button>
      </form>
    )
  }
}

const ModalBody = ({ result, resultList }) => {
  if (resultList.length) {
    return (
      <div>
        <h2>오늘의 모먹?</h2>
        <p className="display">{result}</p>
        <p className="caption">맛점하세용</p>
      </div>
    )
  } else {
    return (
      <div>
        <p className="display">{result}</p>
      </div>
    )
  }
}

export default Inputs