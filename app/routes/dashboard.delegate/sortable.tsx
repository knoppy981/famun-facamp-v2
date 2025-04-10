import { Dispatch, ReactNode, SetStateAction, useState } from "react"
import { AnimatePresence, LayoutGroup, Reorder, motion, useDragControls } from "motion/react"
import useMeasure from "react-use-measure"

import { cn } from "~/lib/utils"


export type Item = {
  council: string
  language: 'portuguese' | 'english' | 'spanish'
  id: number
  description: string
}

interface SortableListItemProps {
  item: Item
  order: number
  onChangeItems: () => void
  renderExtra?: (item: Item) => React.ReactNode
  isExpanded?: boolean
  className?: string
  handleDrag: () => void
}


function SortableListItem({
  item,
  order,
  onChangeItems,
  renderExtra,
  handleDrag,
  isExpanded,
  className,
}: SortableListItemProps) {
  const [openItemId, setOpenItemId] = useState<number | null>(null)
  let [ref, bounds] = useMeasure()
  const [isDragging, setIsDragging] = useState(false)
  const [isDraggable, setIsDraggable] = useState(true)
  const dragControls = useDragControls()

  const handleDragStart = (event: any) => {
    setIsDragging(true)
    dragControls.start(event, { snapToCursor: true })
    handleDrag()
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    onChangeItems()
  }

  return (
    <motion.div className={cn("", className)} key={item.id}>
      <div className="flex w-full items-center">
        <Reorder.Item
          value={item}
          className={cn(
            "relative z-auto grow",
            "h-full rounded-xl bg-accent",
            "shadow-[0px_1px_0px_0px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_rgba(0,0,0,.1),0px_2px_2px_0px_rgba(0,0,0,.1),0px_4px_4px_0px_rgba(0,0,0,.1),0px_8px_8px_0px_rgba(0,0,0,.1)]",
          )}
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            height: bounds.height > 0 ? bounds.height : undefined,
            transition: {
              duration: 0.4,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.05,
              type: "spring",
              bounce: 0.1,
            },
          }}
          layout
          layoutId={`item-${item.id}`}
          // dragListener={!item.checked}
          dragControls={dragControls}
          onDragEnd={handleDragEnd}
          style={
            isExpanded
              ? {
                zIndex: 9999,
                position: "relative",
                overflow: "hidden",
              }
              : {
                position: "relative",
                overflow: "hidden",
              }
          }
          whileDrag={{ zIndex: 9999 }}
        >
          <div ref={ref} className={cn(isExpanded ? "" : "", "z-20 ")}>
            <motion.div
              layout="position"
              className={cn(isExpanded ? "gap-2" : "", "flex flex-col justify-between p-3")}
              transition={{
                type: "spring",
                bounce: 0,
                duration: 0.55,
              }}
            >
              <AnimatePresence>
                <motion.div
                  transition={{ duration: 0.001 }}
                  className="flex items-center space-x-2"
                >
                  {/* List Order */}
                  <p className="font-mono text-xs pl-1 text-foreground/50">
                    {order + 1}
                  </p>

                  {/* List Title */}
                  <motion.div
                    className="px-1 min-w-[150px]"
                    initial={{
                      opacity: 0,
                      filter: "blur(4px)",
                    }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                  >
                    <h4
                      className={cn(
                        "tracking-tighter  text-foreground",
                      )}
                    >
                      {item.council}
                    </h4>
                  </motion.div>
                </motion.div>

              </AnimatePresence>

              {/* List Item Children */}
              {renderExtra && renderExtra(item)}
            </motion.div>
          </div>
          <div
            onPointerDown={isDraggable ? handleDragStart : undefined}
            style={{ touchAction: "none" }}
          />
        </Reorder.Item>
      </div>
    </motion.div>
  )
}
SortableListItem.displayName = "SortableListItem"


interface SortableListProps {
  items: Item[]
  setItems: Dispatch<SetStateAction<Item[]>>
  onChangeItems: (items: Item[]) => void
  renderItem: (
    item: Item,
    order: number,
    onChangeItems: () => void
  ) => ReactNode
}


function SortableList({
  items,
  setItems,
  onChangeItems,
  renderItem,
}: SortableListProps) {
  if (items) {
    return (
      <LayoutGroup>
        <Reorder.Group
          axis="y"
          values={items}
          onReorder={setItems}
          className="flex flex-col"
        >
          <AnimatePresence>
            {items?.map((item, index) =>
              renderItem(item, index, () => onChangeItems(items))
            )}
          </AnimatePresence>
        </Reorder.Group>
      </LayoutGroup>
    )
  }
  return null
}
SortableList.displayName = "SortableList"


export { SortableList, SortableListItem }
