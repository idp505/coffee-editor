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
package org.eclipse.emfcloud.coffee.workflow.glsp.server.util;

import java.util.Arrays;

import org.eclipse.emfcloud.coffee.workflow.glsp.server.wfgraph.ActivityNode;
import org.eclipse.emfcloud.coffee.workflow.glsp.server.wfgraph.Icon;
import org.eclipse.emfcloud.coffee.workflow.glsp.server.wfgraph.TaskNode;
import org.eclipse.emfcloud.coffee.workflow.glsp.server.wfgraph.WeightedEdge;
import org.eclipse.emfcloud.coffee.workflow.glsp.server.wfgraph.WfgraphFactory;
import org.eclipse.glsp.graph.GCompartment;
import org.eclipse.glsp.graph.GLabel;
import org.eclipse.glsp.graph.builder.AbstractGCompartmentBuilder;
import org.eclipse.glsp.graph.builder.AbstractGEdgeBuilder;
import org.eclipse.glsp.graph.builder.AbstractGNodeBuilder;
import org.eclipse.glsp.graph.builder.impl.GCompartmentBuilder;
import org.eclipse.glsp.graph.builder.impl.GLabelBuilder;
import org.eclipse.glsp.graph.builder.impl.GLayoutOptions;
import org.eclipse.glsp.graph.util.GConstants;
import org.eclipse.glsp.graph.util.GConstants.HAlign;

public final class WorkflowBuilder {

   public static class WeightedEdgeBuilder extends AbstractGEdgeBuilder<WeightedEdge, WeightedEdgeBuilder> {

      private String probability;

      public WeightedEdgeBuilder() {
         super(ModelTypes.WEIGHTED_EDGE);
      }

      public WeightedEdgeBuilder probability(final String probability) {
         this.probability = probability;
         return self();
      }

      @Override
      protected void setProperties(final WeightedEdge edge) {
         super.setProperties(edge);
         edge.setProbability(probability);
      }

      @Override
      protected WeightedEdge instantiate() {
         return WfgraphFactory.eINSTANCE.createWeightedEdge();
      }

      @Override
      protected WeightedEdgeBuilder self() {
         return this;
      }

   }

   public static class ActivityNodeBuilder extends AbstractGNodeBuilder<ActivityNode, ActivityNodeBuilder> {
      protected String nodeType;

      public ActivityNodeBuilder(final String type, final String nodeType) {
         super(type);
         this.nodeType = nodeType;
      }

      @Override
      protected void setProperties(final ActivityNode node) {
         super.setProperties(node);
         node.setNodeType(nodeType);
      }

      @Override
      protected ActivityNode instantiate() {
         return WfgraphFactory.eINSTANCE.createActivityNode();
      }

      @Override
      protected ActivityNodeBuilder self() {
         return this;
      }
   }

   public static class TaskNodeBuilder extends AbstractGNodeBuilder<TaskNode, TaskNodeBuilder> {
      private final String name;
      private final String taskType;
      private int duration;
      private int degrees;

      public TaskNodeBuilder(final String type, final String name, final String taskType, final int duration) {
         super(type);
         this.name = name;
         this.taskType = taskType;
         this.duration = duration;
      }
      
      public TaskNodeBuilder(final String type, final String name, final String taskType, final int duration, final int degrees) {
          this(type, name, taskType, duration);
          this.degrees = degrees;
       }

      @Override
      protected TaskNode instantiate() {
         return WfgraphFactory.eINSTANCE.createTaskNode();
      }

      @Override
      protected TaskNodeBuilder self() {
         return this;
      }

      @Override
      public void setProperties(final TaskNode taskNode) {
         super.setProperties(taskNode);
         taskNode.setName(name);
         taskNode.setTaskType(taskType);
         taskNode.setDuration(duration);
         taskNode.setDegrees(degrees);
         taskNode.setLayout(GConstants.Layout.VBOX);
         taskNode.getChildren().add(createCompartment(taskNode));
      }

      private GCompartment createCompartment(final TaskNode taskNode) {
    	  GCompartmentBuilder gCompartmentBuilder = new GCompartmentBuilder(ModelTypes.COMP_HEADER) //
            .id(taskNode.getId() + "_header") //
            .layout(GConstants.Layout.HBOX);
            
    	  String[] customNodes = {"automated","grab","release","rotate"};
    	  boolean contains = Arrays.asList(customNodes).contains(taskNode.getTaskType());
    	  
    	  if(!contains)
    		  gCompartmentBuilder.add(createCompartmentIcon(taskNode));
    		  
		  return gCompartmentBuilder.add(createCompartmentHeader(taskNode)).build();
      }

      private GLabel createCompartmentHeader(final TaskNode taskNode) {
         return new GLabelBuilder(ModelTypes.LABEL_HEADING) //
            .id(taskNode.getId() + "_classname") //
            .text(taskNode.getName()) //
            .build();
      }

      private Icon createCompartmentIcon(final TaskNode taskNode) {
         return new IconBuilder() //
            .id(taskNode.getId() + "_icon") //
            .layout(GConstants.Layout.STACK) //
            .layoutOptions(new GLayoutOptions() //
               .hAlign(HAlign.CENTER) //
               .resizeContainer(false)) //
            .add(createCompartmentIconLabel(taskNode)).build();
      }

      private GLabel createCompartmentIconLabel(final TaskNode taskNode) {
         return new GLabelBuilder(ModelTypes.LABEL_ICON) //
            .id(taskNode.getId() + "_ticon") //
            .text("" + taskNode.getTaskType().toUpperCase().charAt(0)) //
            .build();
      }

   }

   public static class IconBuilder extends AbstractGCompartmentBuilder<Icon, IconBuilder> {
      private String commandId;

      public IconBuilder() {
         super(ModelTypes.ICON);
      }

      public IconBuilder commandId(final String commandId) {
         this.commandId = commandId;
         return self();
      }

      @Override
      protected Icon instantiate() {
         return WfgraphFactory.eINSTANCE.createIcon();
      }

      @Override
      protected void setProperties(final Icon comp) {
         super.setProperties(comp);
         comp.setCommandId(commandId);
      }

      @Override
      protected IconBuilder self() {
         return this;
      }

   }

   private WorkflowBuilder() {}
}
