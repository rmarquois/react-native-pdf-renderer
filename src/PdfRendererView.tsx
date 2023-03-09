// MIT License

// Copyright (c) 2023 Douglas Nassif Roma Junior

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import React, {useCallback} from 'react';
import {
  NativeSyntheticEvent,
  requireNativeComponent,
  ViewProps,
} from 'react-native';

export type PdfRendererViewPropsType = ViewProps & {
  source?: string;
  distanceBetweenPages: number;
  maxZoom: number;
  onPageChange?: (page: number, totalPages: number) => void;
};

type OnPageChangeEventType = {
  position: number;
  total: number;
};

const PdfRendererNative = requireNativeComponent('RNPdfRendererView') as any;

const PdfRendererView = (props: PdfRendererViewPropsType): JSX.Element => {
  const {onPageChange, ...others} = props;

  const handlePageChange = useCallback(
    (event: NativeSyntheticEvent<OnPageChangeEventType>) => {
      onPageChange?.(event.nativeEvent.position, event.nativeEvent.total);
    },
    [onPageChange],
  );

  return <PdfRendererNative {...others} onPageChange={handlePageChange} />;
};

PdfRendererView.defaultProps = {
  maxZoom: 5,
  distanceBetweenPages: 16,
};

export default PdfRendererView;
