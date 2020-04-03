import React from 'react';

const Formfields = ({formdata, change, id}) => {

	const showError = () => {
		let errMessage = <div className="text-danger pt-1">
			{ formdata.validation && !formdata.valid ?
				formdata.validationMessage
			:null}
		</div>

		return errMessage;
	}

	const renderTemplate = () => {
		let formTemplate = null;

		switch(formdata.element){

			case('input'):
				formTemplate = (
					<React.Fragment>
						{/*--------------------------------------------
						|---@Input
						--------------------------------------------*/}
						{ formdata.showlabel ?
							<div className="label_inputs">
								{ formdata.config.label }
							</div>
						:null}
						
						<input
							{...formdata.config}
							value={formdata.value}
							onChange={ (event)=>change({event, id}) }
						/>
						{ showError() }
					</React.Fragment>
				);
			break;

			case('textarea'):
				formTemplate = (
					<React.Fragment>
						{/*--------------------------------------------
						|---@Textarea
						--------------------------------------------*/}
						{ formdata.showlabel ?
							<div className="label_inputs">
								{ formdata.config.label }
							</div>
						:null }
						<textarea 
							{...formdata.config}
							onChange={ (event)=>change({event, id}) }
							value={ formdata.value }
						/>
					</React.Fragment>
				);
			break;

			case('select'):
				formTemplate = (
					<React.Fragment>
						{/*--------------------------------------------
						|---@Select
						--------------------------------------------*/}
						{ formdata.showlabel ?
							<div className="label_inputs">
								{ formdata.config.label }
							</div>
						:null }

						<select
							className={formdata.config.className}
							value={formdata.value}
							onChange={ (event)=>change({event, id}) }
						>
							{formdata.config.options.map( (item, index)=>(
								<option key={item.key} value={item.key}>
									{item.value}
								</option>
							))}
						</select>
						{ showError() }
					</React.Fragment>
				);
			break;

			default:
				formTemplate = null;
		}

		return formTemplate;
	}

	return(
		<React.Fragment>
			{renderTemplate()} 
		</React.Fragment>
	);
};

export default Formfields;