/*******************************************************************************
 * Copyright (c) 2019-2020 EclipseSource and others.
 * 
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * https://www.eclipse.org/legal/epl-2.0, or the MIT License which is
 * available at https://opensource.org/licenses/MIT.
 * 
 * SPDX-License-Identifier: EPL-2.0 OR MIT
 ******************************************************************************/
package org.eclipse.emfcloud.coffee.workflow.glsp.server.model;



import org.eclipse.emfcloud.coffee.AutomaticTask;
import org.eclipse.emfcloud.coffee.Decision;
import org.eclipse.emfcloud.coffee.Fork;
import org.eclipse.emfcloud.coffee.GrabTask;
import org.eclipse.emfcloud.coffee.Join;
import org.eclipse.emfcloud.coffee.ManualTask;
import org.eclipse.emfcloud.coffee.Merge;
import org.eclipse.emfcloud.coffee.Node;
import org.eclipse.emfcloud.coffee.ReleaseTask;
import org.eclipse.emfcloud.coffee.RotateTask;
import org.eclipse.emfcloud.coffee.workflow.glsp.server.util.ModelTypes;
public final class CoffeeTypeUtil {
	public static final String FORK_NODE = "activityNode:fork";
	public static final String JOIN_NODE = "activityNode:join";

	public static String toType(Node node) {
		if (node instanceof AutomaticTask) {
			return ModelTypes.AUTOMATED_TASK;
		}
		if (node instanceof ManualTask) {
			return ModelTypes.MANUAL_TASK;
		}
		if (node instanceof GrabTask) {
			return ModelTypes.GRAB_TASK;
		}
		if (node instanceof ReleaseTask) {
			return ModelTypes.RELEASE_TASK;
		}
		if (node instanceof RotateTask) {
			return ModelTypes.ROTATE_TASK;
		}
		if (node instanceof Decision) {
			return ModelTypes.DECISION_NODE;
		}
		if (node instanceof Merge) {
			return ModelTypes.MERGE_NODE;
		}
		if (node instanceof Fork) {
			return FORK_NODE;
		}
		if (node instanceof Join) {
			return JOIN_NODE;
		}
		return "unknown";
	}

	public static String toNodeType(Node node) {
		if (node instanceof AutomaticTask) {
			return "automated";
		}
		if (node instanceof ManualTask) {
			return "manual";
		}
		if (node instanceof GrabTask) {
			return "grab";
		}
		if (node instanceof ReleaseTask) {
			return "release";
		}
		if (node instanceof RotateTask) {
			return "rotate";
		}
		if (node instanceof Decision) {
			return "decisionNode";
		}
		if (node instanceof Merge) {
			return "mergeNode";
		}
		if (node instanceof Fork) {
			return "forkNode";
		}
		if (node instanceof Join) {
			return "joinNode";
		}
		return "unknown";
	}

	private CoffeeTypeUtil() {
	}
}
