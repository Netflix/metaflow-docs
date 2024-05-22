# @trigger_on_finish

Use the `@trigger_on_finish` decorator to trigger a flow [deployed on Argo Workflows](/production/scheduling-metaflow-flows/scheduling-with-argo-workflows) when another flow finishes.

Read more in [Triggering Flows Based on Other Flows](/production/event-triggering/flow-events).

<!-- WARNING: THIS FILE WAS AUTOGENERATED! DO NOT EDIT! Instead, edit the notebook w/the location & name as this file. -->


<DocSection type="decorator" name="trigger_on_finish" module="metaflow" show_import="True" heading_level="3" link="https://github.com/Netflix/metaflow/tree/master/metaflow/plugins/events_decorator.py#L184">
<SigArgSection>
<SigArg name="..." />
</SigArgSection>
<Description summary="Specifies the flow(s) that this flow depends on." extended_summary="```\n@trigger_on_finish(flow='FooFlow')\n```\nor\n```\n@trigger_on_finish(flows=['FooFlow', 'BarFlow'])\n```\nThis decorator respects the @project decorator and triggers the flow\nwhen upstream runs within the same namespace complete successfully\n\nAdditionally, you can specify project aware upstream flow dependencies\nby specifying the fully qualified project_flow_name.\n```\n@trigger_on_finish(flow='my_project.branch.my_branch.FooFlow')\n```\nor\n```\n@trigger_on_finish(flows=['my_project.branch.my_branch.FooFlow', 'BarFlow'])\n```\n\nYou can also specify just the project or project branch (other values will be\ninferred from the current project or project branch):\n```\n@trigger_on_finish(flow={&#34;name&#34;: &#34;FooFlow&#34;, &#34;project&#34;: &#34;my_project&#34;, &#34;project_branch&#34;: &#34;branch&#34;})\n```\n\nNote that `branch` is typically one of:\n  - `prod`\n  - `user.bob`\n  - `test.my_experiment`\n  - `prod.staging`" />
<ParamSection name="Parameters">
	<Parameter name="flow" type="Union[str, Dict[str, str]], optional" desc="Upstream flow dependency for this flow." />
	<Parameter name="flows" type="List[Union[str, Dict[str, str]], optional" desc="Upstream flow dependencies for this flow." />
	<Parameter name="options" type="dict, optional" desc="Backend-specific configuration for tuning eventing behavior." />
</ParamSection>
</DocSection>
