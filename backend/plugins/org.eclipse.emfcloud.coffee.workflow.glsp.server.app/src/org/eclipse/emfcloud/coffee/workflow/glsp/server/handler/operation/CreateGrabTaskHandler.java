package org.eclipse.emfcloud.coffee.workflow.glsp.server.handler.operation;


import org.eclipse.emfcloud.coffee.CoffeePackage;
import org.eclipse.emfcloud.coffee.workflow.glsp.server.util.ModelTypes;

public class CreateGrabTaskHandler extends AbstractCreateTaskHandler {

	public CreateGrabTaskHandler() {
		super(ModelTypes.GRAB_TASK, CoffeePackage.Literals.GRAB_TASK);
	}

	@Override
	public String getLabel() {
		return "Grab Task";
	}

}
