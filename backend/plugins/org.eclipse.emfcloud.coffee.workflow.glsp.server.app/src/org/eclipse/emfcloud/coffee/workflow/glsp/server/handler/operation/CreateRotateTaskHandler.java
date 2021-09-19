package org.eclipse.emfcloud.coffee.workflow.glsp.server.handler.operation;


import org.eclipse.emfcloud.coffee.CoffeePackage;
import org.eclipse.emfcloud.coffee.workflow.glsp.server.util.ModelTypes;

public class CreateRotateTaskHandler extends AbstractCreateTaskHandler {

	public CreateRotateTaskHandler() {
		super(ModelTypes.ROTATE_TASK, CoffeePackage.Literals.ROTATE_TASK);
	}

	@Override
	public String getLabel() {
		return "Rotate Task";
	}

}
