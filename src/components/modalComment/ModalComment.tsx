import React, { useEffect, useState } from 'react'
import ModalButton from '@/components/modalButton/ModalButton'
import { deleteComments } from '@/api/comments/deleteComments'
import { getComments } from '@/api/comments/getComments'
import { CreateCommentType, createComments } from '@/api/comments/createComments'
import { EditCommentType, editComments } from '@/api/comments/editComments'
import { CommentType } from '@/types/commentType'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { mappingTime } from '@/utils/mappingTime'
import styles from './ModalComment.module.scss'
import Image from 'next/image'
import useScroll from '@/hooks/useScroll'
import RandomProfile from '../randomProfile/RandomProfile'

interface ModalCommentProps {
  dashboardId: number
  columnId: number
  cardId: number
}

export default function ModalComment({ dashboardId, columnId, cardId }: ModalCommentProps) {
  const [comment, setComment] = useState('')
  const [filterList, setFilterList] = useState<Array<number>>([])
  const [isEdit, setIsEdit] = useState(false)
  const [editCommentId, setEditCommentItemId] = useState(0)
  const [editComment, setEditComment] = useState('')
  const queryClient = useQueryClient()
  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }

  const handleEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditComment(e.target.value)
  }

  const handleEditCancel = () => {
    setIsEdit(false)
    setEditComment('')
  }

  const commentQuery = useInfiniteQuery({
    queryKey: ['getComments', cardId],
    queryFn: async ({ pageParam = null }) => {
      return getComments(cardId, pageParam)
    },
    initialPageParam: null,
    getNextPageParam: (lastpage) => {
      if (lastpage.cursorId) {
        return lastpage.cursorId
      }
      return undefined
    },

    getPreviousPageParam: (firstPage) => {
      if (firstPage.cursorId) {
        return firstPage.cursorId
      }
      return undefined
    },
    select: (data) => {
      const filteredComment = data.pages[0].comments.filter((comment: CommentType) => {
        !filterList.includes(comment.id)
      })
      return {
        ...data,
        comments: filteredComment,
      }
    },
  })

  const { Isvisible, myRef } = useScroll()

  useEffect(() => {
    if (Isvisible && commentQuery.hasNextPage) {
      commentQuery.fetchNextPage()
    }
  }, [Isvisible, commentQuery.hasNextPage])

  const createMutation = useMutation({
    mutationFn: (data: CreateCommentType) => createComments(data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['getComments', cardId] })
      commentQuery.refetch()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (commnetId: number) => {
      setFilterList((prev) => [...prev, commnetId])
      return deleteComments(commnetId)
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['getComments', cardId] })
      commentQuery.refetch()
    },
  })

  // 수정하기
  const editMutation = useMutation({
    mutationFn: ({ commentId, content }: EditCommentType) => editComments({ commentId, content }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['getComments', cardId] })
      commentQuery.refetch()
    },
  })
  const commentList = commentQuery.data?.pages.flatMap((page) => page.comments) || []

  const handleCreateComment = () => {
    createMutation.mutate({
      content: comment,
      cardId: cardId,
      columnId: columnId,
      dashboardId: dashboardId,
    })
    setComment('')
  }
  const handleDeleteComment = (commentId: number) => {
    deleteMutation.mutate(commentId)
  }

  // 수정하기 확인 버튼 실행하기
  const handleEditExecute = (commentId: number) => {
    if (editComment.length > 0) {
      editMutation.mutate({
        commentId: commentId,
        content: editComment,
      })
      setIsEdit(false)
      setEditComment('')
      return
    }
  }

  const handleEditComment = (commentId: number) => {
    const targetItem = commentList.find((item) => item.id === commentId)!
    setEditComment(targetItem.content)
    setIsEdit(true)
    setEditCommentItemId(targetItem.id)
  }

  return (
    <div className={styles.comment__wrapper}>
      <span className={styles.comment__text}>댓글</span>
      <div className={styles.commnet}>
        s
        <div className={styles.relative}>
          <textarea className={styles.textarea} value={comment} onChange={handleComment} />
          <div className={styles.button}>
            <ModalButton
              size="small"
              color="white"
              onClick={handleCreateComment}
              disabled={!comment.length}
            >
              입력
            </ModalButton>
          </div>
        </div>
        <ul className={styles.comment__ul}>
          {commentList?.map((comment) => {
            const author = comment.author
            const content = comment.content
            const createdAt = comment.createdAt
            const { year, month, day, hour, minutes } = mappingTime(createdAt)
            return (
              <li key={comment.id} className={styles.commentList__item}>
                <div className={styles.profileImage}>
                  {author.profileImageUrl ? (
                    <Image src={author.profileImageUrl} alt="commentuser" width="30" height="30" />
                  ) : (
                    <>
                      <RandomProfile size={20} email={author.nickname}></RandomProfile>
                    </>
                  )}
                </div>
                <div>
                  <div className={styles.commentperson__wrapper}>
                    <div className={styles.commnet__person}>
                      <span className={styles.nickname}>{author.nickname}</span>
                      <span className={styles.time}>
                        {year}.{month}.{day}.{hour}:{minutes}
                      </span>
                    </div>
                    {editCommentId === comment.id && isEdit ? (
                      <>
                        <input onChange={handleEditInput} value={editComment} />
                        <button onClick={() => handleEditExecute(comment.id)}>수정하기</button>
                        <button onClick={handleEditCancel}>수정취소</button>
                      </>
                    ) : (
                      <div className={styles.content}>{content}</div>
                    )}
                  </div>
                  <div className={styles.button_wrapper}>
                    <button onClick={() => handleEditComment(comment.id)}>수정</button>
                    <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
                  </div>
                </div>
              </li>
            )
          })}
          <div ref={myRef}></div>
        </ul>
      </div>
    </div>
  )
}
