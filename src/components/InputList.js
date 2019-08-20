import React, { Component } from 'react';
import RadioButton from './RadioButton'
import Checkbox from './Checkbox';

class Inputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    // 선택된 거리 value
    const distanceOption = distanceOptions.filter(item => {
      return item.isChecked
    })
    const distance = Number(distanceOption[0].value)

    // 선택된 가격 value
    const priceOption = priceOptions.filter(item => {
      return item.isChecked
    })
    const price = Number(priceOption[0].value)

    // 선택된 카테고리만 배열에 넣음
    const filteredCategory = categoryOptions.reduce((pre, cur) => {
      if (cur.isChecked) {
        pre.push(cur.value)
      }
      return pre
    }, [])

    // 식당 리스트에서 선택한 값들만 필터링
    const result = restaurants.filter(item => {
      // 카테고리가 하나라도 겹치는 경우 true 리턴
      const categoryFlag = item.category.some(e => filteredCategory.includes(e))
      return item.price === price && item.distance <= distance && categoryFlag
    })

    console.log(result)
  }

  render() {
    const { distanceOptions, priceOptions, categoryOptions } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="distance form">
          <h2>거리</h2>
          {
            distanceOptions.map((distance, id) => {
              return (<RadioButton key={id} handleRadioChange={this.handleRadioChange} {...distance} />)
            })
          }

        </div>
        <div className="price form">
          <h2>가격</h2>
          {
            priceOptions.map((price, id) => {
              return (<RadioButton key={id} handleRadioChange={this.handleRadioChange} {...price} />)
            })
          }
        </div>
        <div className="category form">
          <h2>종류</h2>
          {
            categoryOptions.map((category, id) => {
              return (<Checkbox key={id} handleCheckboxChange={this.handleCheckboxChange} {...category} />)
            })
          }
        </div>
        <input type="submit" value="결과 보기" />
      </form>
    )
  }
}

export default Inputs