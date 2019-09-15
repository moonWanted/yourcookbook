import React, { Component } from 'react';

export class ListPane extends Component {
    render() {
        return (
          <div className='list-group list-pane' >
             { this.props.recipeNames.map((item) => {
                 return <li className="list-group-item" id={item.recipe.replace(/ /g, '-')} onClick={this.props.listPaneHandler}>{item.recipe}</li>
              })}
          </div>
        );
    }
}