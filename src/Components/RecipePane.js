import React, { Component } from 'react';


export class RecipePane extends Component {
    render() {
        return (
            <div className='recipe-pane jumbotron m-5'>
                <div className='recipe-pane-header row'>
                    <h4 className='display-4 col-sm align-items-center'>{this.props.currentRecipe.recipe}</h4>
                  {/*  <div className='col-sm align-items-center'></div>*/}
                    <div className='btn-group' role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-secondary" onClick={this.props.deleteButtonHandler}>Del</button>
                        <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#exampleModal" onClick={this.props.editButtonHandler}>Red</button>
                        </div>
                </div>
                <div className='recipe-pane-body text-left p-5'>
                    <div className='recipe-pane-ingredients'>
                        Ingredients:
                        {this.props.currentRecipe.ingredients.map((item) => {
                            return <li>{item}</li>
                        })
                        }
                    </div>
                    <p/>
                    <div className={'recipe-pane-directions'}>
                        {this.props.currentRecipe.directions}</div>
                </div>
            </div>
        );
    }
}