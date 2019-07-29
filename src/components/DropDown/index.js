import React, {Component}  from 'react'
import PropTypes from 'prop-types'
import './assets/index.css'

import IconUp from './assets/icons/up'
import IconDown from './assets/icons/down'
import IconAdd from './assets/icons/add'
import IconClose from './assets/icons/close'
import IconTick from './assets/icons/tick'

const ITEM_ACTIVE_CLASSNAME = 'App--DropDown_active';

const DD_DEFAULT_CONFIG = {
  maxResultHeight: 203,
  items: [],
  withoutPhoto: false,
  placeholder: 'Start typing something...',
  addButtonText: 'Add',
  emptyResultText: 'Here is that empty...',
  returnMap: false,
  onChangeCallback: () => {}
};

class index extends Component {
  static propTypes = {
    maxResultHeight: PropTypes.number,
    items: PropTypes.array,
    withoutPhoto: PropTypes.bool,
    placeholder: PropTypes.string,
    addButtonText: PropTypes.string,
    emptyResultText: PropTypes.string,
    onChangeCallback: PropTypes.func,
    returnMap: PropTypes.bool
  };

  state = {
    search: "",
    selected: new Map(),
    resultIsDisplayed: false,
    buttonAddIsDisplayed: false,
    mouseOverFlag: false
  };

  // life cycles

  constructor(props) {
    super(props);
    this.opts = Object.assign({}, DD_DEFAULT_CONFIG);

    Object.keys(props).forEach((key) => {
      this.opts[key] = props[key];
    });
  }

  componentWillMount() {
    this.input = React.createRef();
    this.boxResult = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("click", this.windowClickHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.windowClickHandler);
  }

  // accessors

  get items() {
    return this.opts.items.slice().filter(
      ({name}) => name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1
    );
  }

  // handlers

  windowClickHandler = () => {
    if (!this.state.mouseOverFlag && this.state.resultIsDisplayed) {
      this.hideBlockResult();
    }
  };

  inputKeyListener = (evt) => {
    evt = evt || window.event;
    switch (evt.keyCode) {
      case 27:
        this.hideBlockResult();
        break;
      case 13:
        //
        break;
      default:
        //
        break;
    }
  };

  // block with results

  toggleBlockResult = () => {
    this.setState({
      ...this.state,
      resultIsDisplayed: !this.state.resultIsDisplayed
    })
  };

  hideBlockResult = () => {
    this.setState({
      ...this.state,
      resultIsDisplayed: false
    })
  };

  showBlockResult = () => {
    this.setState({
      ...this.state,
      resultIsDisplayed: true
    })
  };

  // main block

  mainParentMouseOverHandler = () => {
    this.setState({
      ...this.state,
      mouseOverFlag: true
    })
  };

  mainParentMouseOutHandler = () => {
    this.setState({
      ...this.state,
      mouseOverFlag: false
    })
  };

  mainParentBlurHandler = () => {
    if (!this.state.mouseOverFlag) {
      this.hideBlockResult();
    }
  };

  mainParentBlurHelperHandler = (evt) => {
    const allowClass = [
      'App--DropDown_c_left',
      'App--DropDown_container_content',
      'App--DropDown',
      'App--DropDown_container'
    ];
    if (allowClass.indexOf(evt.target.classList[0]) > -1) {
      if (this.state.resultIsDisplayed) {
        this.hideBlockResult();
      } else {
        this.inputFocus();
      }
    }
  };

  // input

  inputFocus = () => {
    this.input.current.focus();
  };

  inputOnChangeValue = (search) => {
    this.setState({
      ...this.state,
      search: search.currentTarget.value
    });
  };

  inputOnBlurEvent = () => {
    if (!this.state.mouseOverFlag) {
      this.hideBlockResult();
    }
  };

  // store

  selectedStoreAdd = (id, value) => {
    const store = this.state.selected;
    store.set(id, value);
    this.setState({
      ...this.state,
      selected: store,
      search: ""
    }, () => {
      this.boxResult.current.scrollTo(0, 0);
      this.hideBlockResult();
      this.selectedStoreOnChange();
    });
  };

  selectedStoreRemove = (id) => {
    const store = this.state.selected;
    store.delete(id);
    this.setState({
      ...this.state,
      selected: store
    }, () => {
      this.selectedStoreOnChange();
    });
  };

  selectedStoreOnChange = () => {
    if (this.opts.returnMap) {
      this.opts.onChangeCallback(this.state.selected);
    } else {
      const selected = [];
      [...this.state.selected.keys()].forEach((key) => {
        selected.push(this.state.selected.get(key));
      });
      this.opts.onChangeCallback(selected);
    }
  };

  render() {
    return <div
      className="App--DropDown"
      onMouseOver={this.mainParentMouseOverHandler}
      onMouseOut={this.mainParentMouseOutHandler}
      onBlur={this.mainParentBlurHandler}
      onClick={this.mainParentBlurHelperHandler}
    >
      <div
        className="App--DropDown_container"
        style={this.state.resultIsDisplayed ? {borderRadius:"4px 4px 0 0"} : {}}
      >
        <div className="App--DropDown_container_content">
          <div className="App--DropDown_c_left">
            <div className="App--DropDown_storeSelected">
              {[...this.state.selected.keys()].map((key, i) => {
                const item = this.state.selected.get(key);
                return <div key={i} className="App--DropDown_store_item">
                  <div className="App--DropDown_store_item_left">
                    <span>{item.name}</span>
                  </div>
                  <div
                    className="App--DropDown_store_item_right"
                    onClick={() => this.selectedStoreRemove(item.id)}
                  >
                    <span>
                      <IconClose/>
                    </span>
                  </div>
                </div>
              })}
            </div>
            <div
              className="App--DropDown_store_item App--DropDown_add_button"
              onClick={this.inputFocus}
              style={this.state.selected.size > 0 && !this.state.resultIsDisplayed ? {display:"block"}:{}}
            >
              <div className="App--DropDown_store_item_left">
                <span>{this.opts.addButtonText}</span>
              </div>
              <div className="App--DropDown_store_item_right">
                <span>
                  <IconAdd/>
                </span>
              </div>
            </div>
            <input
              ref={this.input}
              type="text"
              placeholder={this.opts.placeholder}
              onClick={this.showBlockResult}
              onFocus={this.showBlockResult}
              onBlur={this.inputOnBlurEvent}
              onKeyUp={this.inputKeyListener}
              onChange={this.inputOnChangeValue}
              value={this.state.search}
            />
          </div>
          <div className="App--DropDown_c_right" onClick={() => {this.toggleBlockResult()}}>
            <div className="App--DropDown_svg_vector">
              {this.state.resultIsDisplayed ? <IconUp/> : <IconDown/>}
            </div>
          </div>
        </div>
        <div className="App--DropDown_items" style={{display: this.state.resultIsDisplayed ? "block":"none"}}>
          <div ref={this.boxResult} className="App--DropDown_result" style={{maxHeight: this.opts.maxResultHeight}}>
            {this.items.length > 0 ? this.items.map((item, i) => {
              const selected = this.state.selected.has(item.id) ? true : false;
              return <div
                key={i}
                className={"App--DropDown_item" + (selected ? " " + ITEM_ACTIVE_CLASSNAME : "")}
                onClick={() => {!selected ? this.selectedStoreAdd(item.id, item) : this.selectedStoreRemove(item.id)}}
              >
                {this.opts.withoutPhoto === true ||
                  <div className="App--DropDown_item_left">
                    <div className="App--DropDown_item_photo" style={{backgroundImage: "url("+ item.photo +")"}}>
                    </div>
                  </div>
                }
                <div className="App--DropDown_item_content">
                  <div className="App--DropDown_name">
                    <span>
                      {item.name} <span style={{color: '#bbb'}}>{item.price}$</span>
                    </span>
                  </div>
                  <div className="App--DropDown_description">
                    <span>{item.volatility}</span>
                  </div>
                </div>
                <div className="App--DropDown_item_right">
                  <div className="App--DropDown_svg_right_item">
                    <IconTick />
                  </div>
                </div>
              </div>
            }) : <div className="App--DropDown_empty_result" onClick={() => {this.hideBlockResult()}}>
              {this.opts.emptyResultText}
            </div>}
          </div>
        </div>
      </div>
    </div>
  }
}

export default index;