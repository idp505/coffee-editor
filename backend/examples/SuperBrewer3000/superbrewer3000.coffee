<?xml version="1.0" encoding="ASCII"?>
<org.eclipse.emfcloud.coffee.model:Machine xmi:version="2.0" xmlns:xmi="http://www.omg.org/XMI" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:org.eclipse.emfcloud.coffee.model="http://www.eclipse.org/emfcloud/coffee/model" name="SuperBrewer3000">
  <children xsi:type="org.eclipse.emfcloud.coffee.model:BrewingUnit">
    <children xsi:type="org.eclipse.emfcloud.coffee.model:ControlUnit">
      <processor vendor="Qualcommm" clockSpeed="5" numberOfCores="10" socketconnectorType="Z51" thermalDesignPower="1000"/>
      <dimension width="10" height="12" length="13"/>
      <display width="10" height="20"/>
    </children>
  </children>
  <workflows name="BrewingFlow">
    <nodes xsi:type="org.eclipse.emfcloud.coffee.model:ManualTask" name="Push"/>
    <nodes xsi:type="org.eclipse.emfcloud.coffee.model:AutomaticTask" name="Check Water"/>
    <nodes xsi:type="org.eclipse.emfcloud.coffee.model:Decision"/>
    <nodes xsi:type="org.eclipse.emfcloud.coffee.model:RotateTask" name="Rotate" degrees="40"/>
    <nodes xsi:type="org.eclipse.emfcloud.coffee.model:ManualTask" name="Brew"/>
    <nodes xsi:type="org.eclipse.emfcloud.coffee.model:ReleaseTask" name="Release"/>
    <nodes xsi:type="org.eclipse.emfcloud.coffee.model:GrabTask" name="Grab"/>
    <nodes xsi:type="org.eclipse.emfcloud.coffee.model:AutomaticTask" name="Discard"/>
    <nodes xsi:type="org.eclipse.emfcloud.coffee.model:RotateTask" name="Rotate" degrees="-20"/>
    <nodes xsi:type="org.eclipse.emfcloud.coffee.model:Merge"/>
    <nodes xsi:type="org.eclipse.emfcloud.coffee.model:ReleaseTask" name="Release"/>
    <flows source="//@workflows.0/@nodes.0" target="//@workflows.0/@nodes.1"/>
    <flows source="//@workflows.0/@nodes.1" target="//@workflows.0/@nodes.2"/>
    <flows xsi:type="org.eclipse.emfcloud.coffee.model:WeightedFlow" source="//@workflows.0/@nodes.2" target="//@workflows.0/@nodes.3"/>
    <flows xsi:type="org.eclipse.emfcloud.coffee.model:WeightedFlow" source="//@workflows.0/@nodes.2" target="//@workflows.0/@nodes.4"/>
    <flows source="//@workflows.0/@nodes.3" target="//@workflows.0/@nodes.5"/>
    <flows source="//@workflows.0/@nodes.4" target="//@workflows.0/@nodes.6"/>
    <flows xsi:type="org.eclipse.emfcloud.coffee.model:WeightedFlow" source="//@workflows.0/@nodes.6" target="//@workflows.0/@nodes.7"/>
    <flows xsi:type="org.eclipse.emfcloud.coffee.model:WeightedFlow" source="//@workflows.0/@nodes.6" target="//@workflows.0/@nodes.8"/>
    <flows source="//@workflows.0/@nodes.7" target="//@workflows.0/@nodes.9"/>
    <flows source="//@workflows.0/@nodes.8" target="//@workflows.0/@nodes.9"/>
    <flows source="//@workflows.0/@nodes.9" target="//@workflows.0/@nodes.10"/>
  </workflows>
</org.eclipse.emfcloud.coffee.model:Machine>
