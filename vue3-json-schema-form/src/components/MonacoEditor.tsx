import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  shallowRef,
  watch,
} from 'vue'
import * as Monaco from 'monaco-editor'
import { createUseStyles } from 'vue-jss'

const useStyles = createUseStyles({
  container: {
    border: '1px solid #eee',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 5,
  },
  title: {
    backgroundColor: '#eee',
    padding: '10px 0',
    paddingLeft: 20,
  },
  code: {
    flexGrow: 1,
  },
})

type OnChnageProps = (
  value: string,
  event: Monaco.editor.IModelContentChangedEvent,
) => void

export default defineComponent({
  props: {
    code: {
      type: String,
      required: true,
    },
    onChange: {
      type: Function as PropType<OnChnageProps>,
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    // 必须是shallowRef，否则editor.getValue()不起作用
    const editorRef = shallowRef()
    const containerRef = ref()

    let _subscription: Monaco.IDisposable | undefined
    let __preventTriggerChageEvent = false

    onMounted(() => {
      const editor = (editorRef.value = Monaco.editor.create(
        containerRef.value,
        {
          value: props.code,
          language: 'json',
          formatOnPaste: true,
          tabSize: 2,
          minimap: {
            enabled: false,
          },
        },
      ))

      _subscription = editor.onDidChangeModelContent((event) => {
        if (!__preventTriggerChageEvent) {
          props.onChange && props.onChange(editor.getValue(), event)
        }
      })
    })

    onBeforeUnmount(() => {
      if (_subscription) _subscription.dispose()
    })

    watch(
      () => props.code,
      (v) => {
        const editor = editorRef.value
        const model = editor.getModel()
        if (v !== model.getValue()) {
          editor.pushUndoStop()
          __preventTriggerChageEvent = true
          model.pushEditOperations(
            [],
            [
              {
                range: model.getFullModelRange(),
                text: v,
              },
            ],
          )
          editor.pushUndoStop()
          __preventTriggerChageEvent = false
        }
      },
    )

    const classesRef = useStyles()

    return () => {
      const classes = classesRef.value
      return (
        <div class={classes.container}>
          <div class={classes.title}>
            <span>{props.title}</span>
          </div>
          <div class={classes.code} ref={containerRef}></div>
        </div>
      )
    }
  },
})
