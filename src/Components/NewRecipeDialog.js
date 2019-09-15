import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';

export class NewRecipeDialog extends Component {
    render() {
        return (
            <>
                <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={this.props.handleShow}>
                    Create Recipe
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add a Recipe</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Recipe</p>
                                <input id="dialog-recipe"/>
                                <p>Ingredients</p>
                                <Autocomplete
                                    items={this.props.productsData}
                                    shouldItemRender={(item, value) => item.product.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                    getItemValue={item => item.product}
                                    renderItem={(item, highlighted) =>
                                        <div
                                            key={item.id}
                                            style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                                        >
                                            {item.product}
                                        </div>
                                    }
                                    menuStyle={
                                        {borderRadius: '3px',
                                        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                                        background: 'rgba(255, 255, 255, 0.9)',
                                        padding: '2px 0',
                                        fontSize: '90%',
                                        position: 'fixed',
                                        overflow: 'auto',
                                        maxHeight: '20%'}}
                                    value={this.props.value}
                                    onChange={this.props.onChangeDialogIngedients}
                                    onSelect={this.props.onSelectDialogIngedients}
                                />
                                <input id='dialog-grammes' placeholder='gr' size='10' className="tooltip-test" title="Tooltip"/>
                                <button type="button" className="btn btn-secondary m-2 popover-test" data-toggle="popover" title="Don't forget" data-content="Weight must be a number"  id='dialog-add-ingr' onClick={this.props.addIngredientsButtonHandler}>Add</button>
                                <ul id='dialog-ingredients-list'>
                                    {this.props.dialogIngredients.map((item, index) => {
                                        return <li>{item} <i onClick={this.props.deleteDialogIngredient} id={index} className="far fa-trash-alt"></i></li>
                                    })}
                                </ul>
                                <p>Actions</p>
                                <textarea id='dialog-actions' cols="60" rows="3"></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" id='save-changes' onClick={this.props.addNewRecipe}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}