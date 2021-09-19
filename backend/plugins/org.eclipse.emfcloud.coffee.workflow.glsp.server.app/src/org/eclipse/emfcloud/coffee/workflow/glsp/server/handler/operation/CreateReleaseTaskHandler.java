package org.eclipse.emfcloud.coffee.workflow.glsp.server.handler.operation;


import org.eclipse.emfcloud.coffee.CoffeePackage;
import org.eclipse.emfcloud.coffee.workflow.glsp.server.util.ModelTypes;

public class CreateReleaseTaskHandler extends AbstractCreateTaskHandler {

	public CreateReleaseTaskHandler() {
		super(ModelTypes.RELEASE_TASK, CoffeePackage.Literals.RELEASE_TASK);
	}

	@Override
	public String getLabel() {
		return "Release Task";
	}

}
