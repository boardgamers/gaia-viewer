<template>
  <defs>
    <filter id="outline">
      <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="7"></feMorphology>

      <feFlood flood-color="black" flood-opacity="1" result="PINK"></feFlood>
      <feComposite in="PINK" in2="DILATED" operator="in" result="OUTLINE"></feComposite>

      <feMerge>
        <feMergeNode in="OUTLINE" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
</template>
