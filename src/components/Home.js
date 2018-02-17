import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions';
import Moment from 'moment';
import _ from 'lodash';
import {Link} from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        // this.state = { todolist: localStorage.setItem('todolist',) };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleState = this.handleState.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.filterByState = this.filterByState.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.input.value) {
            this.props.addItem(this.input.value);
        } else {
            alert('Enter text!!');
        }
        this.input.value = '';
    }

    handleState(text, updatedState) {
        this.props.updateItem(text, updatedState);
    }


    handleDelete(text) {
        this.props.deleteItem(text);
    }

    filterByState(filter) {
        this.props.updateFilter(filter);
    }

    displayTodoList() {
        let itemList = JSON.parse(localStorage.getItem('todolist'));
        if(this.props.filterByState){
            itemList =  _.filter(itemList, {'currentState':this.props.filterByState})
        }

        const list = itemList && itemList.length>0 ? _.orderBy(itemList,'addedOn','desc').map((todo, index) => (


            <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                <p class="mb-1">{todo.text}</p>
                <div class="d-flex w-100 justify-content-between">
                    <small>Status:{todo.currentState==="I"?"Incomplete":"Complete"}</small>
                </div>
                <div class="d-flex w-100 justify-content-between">
                    <small>Added {Moment(todo.addedOn).fromNow()}</small>
                </div>
                <small> <button className="btn btn-sm btn-danger" onClick={() => this.handleDelete(todo.text)}>Delete</button>
                    {todo.currentState === 'I' ?
                        <button to="" onClick={() => this.handleState(todo.text, 'C')} className="btn btn-sm btn-info marginButton">Mark as complete</button> : <button to="" onClick={() => this.handleState(todo.text, 'I')} className="btn btn-sm btn-secondary marginButton">Mark as Incomplete</button>
                    }</small>
            </a>
           

        )):<div>Nothing to display</div>;
        return list
    }

    render() {
        const itemList = JSON.parse(localStorage.getItem('todolist'));



        return (
            <div className="container">
                <div className="row wrapper">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-8 mainData">
                        <form className="form-group" onSubmit={this.handleSubmit}>
                            <input type="text" ref={(input) => this.input = input}
                                placeholder="Enter action item here" name="todoText"
                                className="form-control wrapper" />
                            {this.props.error === true ? <div className="alert alert-danger">Item already present in the list</div> : <div></div>}
                            <button className="btn btn-primary">Submit</button>
                        </form>

                    </div>
                    <div className="col-sm-2"></div>

                </div>
                {itemList && itemList.length > 0 ?
                    <div className="row wrapper">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-8 mainData">
                            <div>
                                <p className="mb-1">Here are your todos!!</p>
                                <div><Link to="" onClick={()=>this.filterByState(null)} >Show all</Link> | <Link to="" onClick={()=>this.filterByState('C')}>Show only completed items</Link> | <Link to="" onClick={()=>this.filterByState('I')}>Show only incomplete items</Link></div>
                            </div>
                            <div className="list-group">
                                {this.displayTodoList()}
                            </div>
                        </div>
                        <div className="col-sm-2"></div>
                    </div> : <div></div>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        todolist: state.todo.todolist,
        error: state.todo.error,
        filterByState: state.todo.filter
    }
}
export default connect(mapStateToProps, actions)(Home);