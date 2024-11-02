'use client';
import React, { useState, useRef, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { DecoupledEditor } from 'ckeditor5';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { Toast } from '@/components/ui/toast';
import { ToastProvider } from '@radix-ui/react-toast';
import axios from 'axios';


const AIEditor: React.FC = () => {
  const [editorContent, setEditorContent] = useState('');
  const [aiModel, setAIModel] = useState('openai');
  const [aiPrompt, setAIPrompt] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef<any>(null);

  const handleAIOperation = async (operation: string, text: string) => {
    setIsLoading(true);
    setShowToast(true);
    setToastMessage(`Processing ${operation}...`);
    try {
      const prompt = `${operation}: ${text}`;
      let result: string;

      if (aiModel === 'openai') {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
        result = response.data.choices[0].message.content;
      } else if (aiModel === 'gemini') {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY}`,
          {
            contents: [{ parts: [{ text: prompt }] }],
          }
        );
        result = response.data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Invalid AI model selected');
      }

      // if (result && editorRef.current) {
      //   const editor = editorRef.current.editor;
      //   editor.model.change((writer) => {
      //     const range = editor.model.document.selection.getFirstRange();
      //     writer.remove(range);
      //     writer.insertText(result, range.start);
      //   });
      // }
      setToastMessage(`${operation} completed successfully`);
    } catch (error) {
      console.error(`Error during ${operation}:`, error);
      setToastMessage(`Error during ${operation}`);
    } finally {
      setIsLoading(false);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleImageUpload = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve({ default: reader.result });
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  // useEffect(() => {
  //   if (editorRef.current) {
  //     const editor = editorRef.current.editor;

  //     editor.plugins.get('ContextMenu').addItems([
  //       {
  //         name: 'aiRephrase',
  //         label: 'AI Rephrase',
  //         icon: 'https://example.com/ai-icon.svg',
  //         callback: () => {
  //           const selectedText = editor.model.document.selection
  //             .getSelectedContent()
  //             .getChild(0).data;
  //           if (selectedText) {
  //             handleAIOperation('Rephrase', selectedText);
  //           }
  //         },
  //       },
  //       {
  //         name: 'aiGrammarCheck',
  //         label: 'AI Grammar Check',
  //         icon: 'https://example.com/grammar-icon.svg',
  //         callback: () => {
  //           const selectedText = editor.model.document.selection
  //             .getSelectedContent()
  //             .getChild(0).data;
  //           if (selectedText) {
  //             handleAIOperation('Grammar check', selectedText);
  //           }
  //         },
  //       },
  //     ]);
  //   }
  // }, [editorRef.current]);

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <div className='mb-4 flex space-x-2'>
        <Select value={aiModel} onValueChange={setAIModel}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select AI Model' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='openai'>OpenAI</SelectItem>
            <SelectItem value='gemini'>Gemini</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type='text'
          placeholder='Enter AI prompt'
          value={aiPrompt}
          onChange={(e) => setAIPrompt(e.target.value)}
          className='flex-grow'
        />
        <Button
          onClick={() => handleAIOperation('Complete', aiPrompt)}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            'Generate'
          )}
        </Button>
      </div>
      <CKEditor
        ref={editorRef}
        editor={DecoupledEditor}
        data={editorContent}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorContent(data);
        }}
        config={{
          extraPlugins: [
            function (editor: any) {
              editor.plugins.get('FileRepository').createUploadAdapter = (
                loader: any
              ) => {
                return {
                  upload: () => handleImageUpload(loader.file),
                };
              };
            },
          ],
          // contextMenu: {
          //   items: [
          //     'undo',
          //     'redo',
          //     '|',
          //     'cut',
          //     'copy',
          //     'paste',
          //     '|',
          //     'aiRephrase',
          //     'aiGrammarCheck',
          //   ],
          // },
        }}
      />
      {showToast && (
        <ToastProvider>
          <Toast>
            <p>{toastMessage}</p>
          </Toast>
        </ToastProvider>
      )}
    </div>
  );
};

export default AIEditor;
